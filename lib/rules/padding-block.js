/**
 * @fileoverview padding blocks with empty lines before and after when needed
 * @author Chao
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "padding blocks with empty lines before and after when needed",
      category: "format",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here
    let comments // {type, value, range, loc}[]
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      BlockStatement(node) {

        const { body } = node
        const {  start, end } = lines(node)

        if (!comments) {
          comments = allComments(node)
        }

        const blockTypes = ['TryStatement', 'SwitchStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement', 'WithStatement']
        if (body.length > 1 || (body.length === 1 && blockTypes.includes(body[0].type))) {
          const first = body[0]
          const last = body[body.length - 1]
          if (lines(first).start < start + 2 ) {
            context.report({
              message: 'A single empty line is needed at the beginning of the block',
              node,
              loc: {
                start: first.loc.start,
                end: first.loc.start
              },
              fix: (fixer) => {
                return fixer.insertTextAfterRange([node.range[0], node.range[0] + 1], repeat('\n', lines(first).start - start))
              }
            })
          } else {
            const comment = findComment([node.range[0], first.range[0]], comments)
            if (comment) {
              context.report({
                message: 'A single empty line is needed at the beginning of the block',
                node,
                loc: {
                  start: comment.loc.start,
                  end: comment.loc.start
                },
                fix: (fixer) => {
                  return fixer.insertTextAfterRange([node.range[0], node.range[0] + 1], '\n')
                }
              })
            }
          }
          if (lines(last).end > end - 2) {
            context.report({
              message: 'A single empty line is needed at the end of the block',
              node,
              loc: {
                start: last.loc.end,
                end: last.loc.end
              },
              fix: (fixer) => {
                return fixer.insertTextAfter(last, repeat('\n', end - lines(last).end))
              }
            })
          }
        }

      }
    };
  }
};

function allComments(node) {
  while(node.type !== 'Program') {
    node = node.parent
  }
  return (node.comments || []).sort((a, b) => a.range[0] - b.range[0])
}

function findComment(range, comments) {
  return comments.find(comment => comment.range[0] > range[0] && comment.range[1] < range[1])
}


function lines(node) {
  const { loc: {start, end} } = node

  return {
    start: start.line,
    end: end.line
  }
}

function repeat(char, times) {
  let result = ''
  for (let i = 0; i < times; ++i) {
    result += char
  }
  return result
}
