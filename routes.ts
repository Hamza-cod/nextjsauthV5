/**
 * an array of routes that accessible to the public
 * these routes not require authenticatio
 * @type {string[]}
 */
export  const  publicRoutes : string[] = [
 "/"
]
/**
 * an array of routes are used for authentication
 * these routes will redirect to /settings
 * @type {string[]}
 */
 export const authRoures :string[]=[
  "/auth/login",
  "/auth/register",
 ]

/**
 * The prefix for API authentication routes
 * @type {string}
 */
 export const apiPrefix :string="/api/auth"

 /**
  * redirect path after logged in
  * @type {string}
  */

 export const DEFAULT_LOGIN_REDIRECT : string = "/settings"