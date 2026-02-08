
// This shim satisfies the build process when libraries (like bcryptjs) try to import 'crypto'.
// By exporting an empty object, we trigger the library's internal fallback mechanisms
// (e.g. using Math.random or window.crypto) without crashing the build.
export default {};
