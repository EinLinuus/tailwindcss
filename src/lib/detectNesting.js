export default function (_context) {
  return (root, result) => {
    let found = false

    root.walkAtRules('tailwind', (node) => {
      if (found) return false

      if (node.parent && node.parent.type !== 'root') {
        found = true
        node.warn(
          result,
          // TODO: Improve this warning message
          'Nested @tailwind rules detected, instead try to use a prefix: https://tailwindcss.com/docs/configuration#prefix'
        )
        return false
      }
    })

    root.walkRules((rule) => {
      if (found) return false

      rule.walkRules((nestedRule) => {
        found = true
        nestedRule.warn(
          result,
          // TODO: Improve this warning message
          'Nested CSS detected, checkout the docs on how to support nesting: https://tailwindcss.com/docs/using-with-preprocessors#nesting'
        )
        return false
      })
    })
  }
}
