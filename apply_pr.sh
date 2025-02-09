#!/bin/bash

# Ensure a PR ID is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <PR_ID>"
    exit 1
fi

PR_ID="$1"

# Set repository remotes
UPSTREAM="upstream"   # Remote for the original repo
FORK="origin"         # Your fork (default is "origin")

# Ensure upstream remote exists, otherwise add it
if ! git remote get-url $UPSTREAM &>/dev/null; then
    git remote add $UPSTREAM https://github.com/joelshepherd/tabli.git
fi

# Fetch the PR from the upstream repository
echo "Fetching PR #$PR_ID from $UPSTREAM..."
git fetch $UPSTREAM pull/$PR_ID/head:pr-$PR_ID

# Check if fetch was successful
if [ $? -ne 0 ]; then
    echo "Failed to fetch PR #$PR_ID. Check if the PR exists."
    exit 1
fi

# Checkout the PR branch
echo "Checking out PR #$PR_ID..."
git checkout pr-$PR_ID

# Push the PR branch to your fork
echo "Pushing PR #$PR_ID to your fork ($FORK)..."
git push $FORK pr-$PR_ID

# Ask if the user wants to merge it into the main branch
read -p "Do you want to merge PR #$PR_ID into your main branch? (y/N): " merge_choice

if [[ "$merge_choice" =~ ^[Yy]$ ]]; then
    git checkout main
    git merge pr-$PR_ID --no-ff
    git push $FORK main
    echo "PR #$PR_ID merged into main and pushed to fork!"
fi

echo "Done!"
