REPO="SksOp/PCKS"


ENV_FILE_APP="app/.env"
ENV_FILE_FUNCTIONS="functions/.env"

# Check if the required files exist
if [[ ! -f $ENV_FILE_APP ]]; then
    echo "Error: .env file not found in app/ !"
    exit 1
fi

if [[ ! -f $ENV_FILE_FUNCTIONS ]]; then
    echo "Error: .env file not found! in functions/"
    exit 1
fi


# Read the files
ENV_CONTENT_APP=$(<"$ENV_FILE_APP")
ENV_CONTENT_FUNCTIONS=$(<"$ENV_FILE_FUNCTIONS")

# Set the secret using gh cli
echo "Setting secret for ENV_CONTENT_APP"
gh secret set "ENV_APP" --body="$ENV_CONTENT_APP" --repo="$REPO"
echo "Setting secret for ENV_CONTENT_FUNCTIONS"
gh secret set "ENV_FUNCTIONS" --body="$ENV_FILE_FUNCTIONS" --repo="$REPO"


echo "Secret updated successfully!"
