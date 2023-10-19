#
# Calvin C. Chan calvincchan.com 2023-Oct-18
# Write the version number to public/signature.json
#
APP_VERSION=$(./scripts/get-version.sh);
echo "{\"version\":\"$APP_VERSION\"}" > ./public/signature.json
