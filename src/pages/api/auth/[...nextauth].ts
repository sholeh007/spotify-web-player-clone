import spotifyApi, { LOGIN_URL } from "lib/spotify";
import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, //1hour
      refreshToken: refreshedToken.refresh_token || token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefrehAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign
      if (account && user)
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      // return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("token valid");
        return token;
      }
      // refresh token
      console.log("token refresh");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
