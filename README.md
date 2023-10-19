# Version Checking and Auto Update for React Web App

## The Problem

When developing client side web app, it's often important to ensure that the app is updated with the latest version. This is especially true when user leaves the app page opened for a long time. In this case, the user may not be aware that the app is not updated and is running an outdated version.

In this post, I will demoonstrate a simple way to check for updates and reload the app if there is a new version.

## The Solution

1. Generate a version number for the app and embed it in the code on every build.

2. Write the same version number to a file on the server and make sure it is accessible to the client.

3. Have the app periodically fetch for the version number file, and compare it with the embedded value. If the values don't match, reload the app either automatically or with a prompt.

## Code Explaination

See my blog post: https://calvincchan.com/blog/react-version-check-and-auto-update
