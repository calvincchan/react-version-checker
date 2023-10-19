#
# Calvin C. Chan calvincchan.com 2023-Oct-18
# Get the version number from package.json and append the git commit count and hash.
#
VERSION=$(grep -m 1 -o '"version": *"[^"]*"' ./package.json | awk -F'"' '{print $4}');
GIT_COMMIT_COUNT=$(git rev-list --count HEAD);
GIT_COMMIT_HASH=$(git rev-parse --short HEAD);
APP_VERSION="$VERSION-$GIT_COMMIT_COUNT-$GIT_COMMIT_HASH";
echo $APP_VERSION