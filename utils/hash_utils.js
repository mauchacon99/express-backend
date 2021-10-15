const slugify = require('slugify');

/**
 * Replaces special chars with (-)
 * @function
 * @param {String} hash
 * @returns {String} sanitized hash
 */
exports.sanitizeHash = (hash) => {
    const _regex = /[*+~.()'"!:@_]/g;

    let _sanitizedHash = slugify(hash, {remove: _regex});

    return _sanitizedHash;
}
