# actions-credentials-github-apps

Set Git Token using GitHub Apps

## Usage

1. create a new GitHub Apps.
2. Install the App on your repositories or organization or you.
3. See action.yml for the api spec.

```yaml
steps:
- name: Get token
  id: git_token
  uses: pyar6329/actions-credentials-github-apps@main
  with:
    type: org
    APP_PEM: ${{ secrets.APP_PEM }}
    APP_ID: ${{ secrets.APP_ID }}

- name: Get App Installation Token
  env: 
    TOKEN: ${{ steps.git_token.outputs.app_token }}
  run: |
    echo "This token: ${TOKEN}"
```
