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
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "padding blocks with empty lines before and after when needed",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

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

        if (body.length > 1 || (body.length === 1 && body[0].type === 'TryStatement')) {
          const first = body[0]
          const last = body[body.length - 1]
          if (lines(first).start !== start + 2 ) {
            context.report({
              message: 'A single empty line is needed at the beginning of the block',
              node,
              loc: {
                start: first.loc.start,
                end: first.loc.start
              }
            })
          }
          if (lines(last).end !== end - 2) {
            context.report({
              message: 'A single empty line is needed at the end of the block',
              node,
              loc: {
                start: last.loc.end,
                end: last.loc.end
              }
            })
          }

        }
      }
    };
  },
};

function lines(node) {
  const { loc: {start, end} } = node

  return {
    start: start.line,
    end: end.line
  }
}
