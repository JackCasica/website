const findPreworkIssue = require('../trigger-issue/track-developer-activities/find-prework-issue.js')

async function postComment(comment, github, context) {

    const {number: issueNumber} = await findPreworkIssue({g: github, c: context})

    try {
        const commentResponse = await github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issueNumber,
            body: comment,
        });

        return commentResponse;
    } catch (err) {
        throw new Error(err);
    }

}

module.exports = postComment;