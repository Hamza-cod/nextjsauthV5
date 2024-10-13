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
  "/auth/error"
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
 /**
  * this route is for login page 
  * @type {string}
  */
 export const LOGIN_URI : string = "/auth/login"

 /**
  * this route is for error page 
  * @type {string}
  */
 export const ERROR_URI : string = "/auth/error"