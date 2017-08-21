var dict = ["apple", "ample", "amole", "amoke", "smoke", "scoke", "scote", "scute", "saute", "sauty", "saury", "saura", "sabra", "zabra", "zebra"]

function lookup(_original, dict) {
  return dict.includes(_original)
}

function doublets(original, target, dict) {
  console.log(original, target, dict)
  // avoid overriding original when substituting
  var _original = new String(original)
  console.log('length', _original.length)

  for (var i = 0; i < _original.length; i++) {
    console.log('loop', i, _original[i], target[i])
    // substitute at position
    _original[i] = target[i]

    console.log('try:', _original)
    // lookup word
    if (lookup(_original, dict)) {
      var word = _original
      console.log(word)
      // end condition
      if (word === target) {
        console.log('success')
        return word
      }

      // not matching target (end condition) so keep iterating
      doublets(word, target, dict)
    }
    // if no new word was found we try next letter
  }
}

var original = 'apple'
var target = 'zebra'

// doublets(original, target, dict)

function findDistance(word, original) {
  var dist = 0
  for (var i = 0; i < original.length; i++) {
    if (word[i] !== original[i]) dist++
  }
  return dist
}

var distDict = {}

for (let word of dict) {
  var dist = findDistance(word, original)
  var key = '' + dist
  distDict[dist] = distDict[dist] || []
  distDict[dist].push(word)
}

console.log(distDict)

function createDoublets(distDict) {
  return function doublets(original, target, dist) {
    let key = '' + dist
    // console.log(key, distDict)
    let dict = distDict[key]
    if (!dict) {
      throw Error('dict index out of range')
    }

    if (dict.includes(target)) {
      return target
    }

    console.log(dict[0])
    // for (word of dict) {
    //   console.log(word)
    //   if (word === target) return target
    // }
    dist = dist + 1
    return doublets(original, target, dist)
  }
}

var doublets = createDoublets(distDict)

var result = doublets('apple', 'zebra', 1)
console.log(result)
