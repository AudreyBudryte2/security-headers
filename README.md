# Security Headers Check

Utilising the [check-my-headers library](https://github.com/UlisesGascon/check-my-headers/blob/master/README.md), this a check to be used either locally on a machine, or in a GitHub Action.


## Locally
### Install
Install npm package:

    npm install -g quick-security-headers-check

### Running
Once installed, checks can be made for headers of any URL with the following command:

    headers-check https://<VALID_URL>
### Removing
To uninstall: 

    npm uninstall -g quick-security-headers-check


## CI / GitHub Action
On open PR:
 1. Check headers of a given URL.
 2. Report back findings to a PR comment.

A working sample of a GitHub Action workflow can be found [here](https://github.com/AudreyBudryte2/security-headers/blob/main/.github/workflows/security-headers-check.yml).
### Implementation
The below should be placed in a yml file under .github/workflows/security-header-check.yml:

    name: security-headers-check
    on:
      pull_request:
        types: [opened]
    
    jobs: 
     security-headers-check:
     
      runs-on : ubuntu-latest
      
      name : Check headers for violations of security best practises
      
      steps:
        - name : Security headers check
          id : headerscheck
          uses: AudreyBudryte2/security-headers@v2
          with:
           url: 'https://<CHANGE_ME>'
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
        - name: Comment results of security headers check
          uses: mb2dev/github-action-comment-pull-request@1.0.0
          with:
            message: "${{steps.headerscheck.outputs.header-issues}}"
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
Insert the URL that should scanned here:

    url: 'https://<CHANGE_ME>'
