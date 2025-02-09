param (
    [string]$PR_ID
)

if (-not $PR_ID) {
    Write-Host "Usage: .\apply_pr.ps1 <PR_ID>"
    exit 1
}

# Define repository remotes
$UPSTREAM = "upstream"   # Original repo
$FORK = "origin"         # Your fork

# Ensure upstream remote exists, otherwise add it
$upstreamExists = git remote | Select-String -Pattern "^$UPSTREAM$"
if (-not $upstreamExists) {
    Write-Host "Adding upstream remote..."
    git remote add $UPSTREAM https://github.com/joelshepherd/tabli.git
}

# Fetch the PR from upstream
Write-Host "Fetching PR #$PR_ID from $UPSTREAM..."
git fetch $UPSTREAM pull/$PR_ID/head:pr-$PR_ID

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to fetch PR #$PR_ID. Check if the PR exists."
    exit 1
}

# Checkout the PR branch
Write-Host "Checking out PR #$PR_ID..."
git checkout pr-$PR_ID

# Push the PR branch to your fork
Write-Host "Pushing PR #$PR_ID to your fork ($FORK)..."
git push $FORK pr-$PR_ID

# Ask user if they want to merge the PR into main
$merge_choice = Read-Host "Do you want to merge PR #$PR_ID into your main branch? (y/N)"
if ($merge_choice -match "^[Yy]$") {
    git checkout main
    git merge pr-$PR_ID --no-ff
    git push $FORK main
    Write-Host "PR #$PR_ID merged into main and pushed to fork!"
}

Write-Host "Done!"
