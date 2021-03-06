var swig = require('../../lib/swig'),
  expect = require('expect.js'),
  _ = require('lodash'),
  Swig = swig.Swig;

var cases = [
  { input: '{% for a in b %}{{ a }}{% endfor %}', out: '123' },
  { input: '{% for a in [1,2,3] %}{{ a }}{% endfor %}', out: '123' },
  { input: '{% for a in b %}{{ loop.index }}{% endfor %}', out: '123' },
  { input: '{% for a in b %}{{ loop.index0 }}{% endfor %}', out: '012' },
  { input: '{% for a in b %}{{ loop.revindex }}{% endfor %}', out: '321' },
  { input: '{% for a in b %}{{ loop.revindex0 }}{% endfor %}', out: '210' },
  { input: '{% for a in b %}{{ loop.key }}{% endfor %}', out: '012' },
  { input: '{% for a,b in b %}{{ loop.key }}{% endfor %}', out: '012' },
  { input: '{% for a in b %}{{ loop.first }}, {% endfor %}', out: 'true, false, false, ' },
  { input: '{% for a in b %}{{ loop.last }}, {% endfor %}', out: 'false, false, true, ' },
  { input: '{% for a,b in b %}{{ b }}{% endfor %}', out: '012' },
  { input: '{% for a, b in c %}{{ b }}{% endfor %}', out: 'ab' },
  { input: '{% for a in c %}{{ loop.index }}{% endfor %}', out: '12' },
  { input: '{% for a in c %}{{ loop.index }}{% endfor %}', out: '12' },
  { input: '{% for a in d|default(["a"]) %}{{ a }}{% endfor %}', out: 'a' },
];

describe('Tag: for', function () {
  var opts = {
    locals: {
      b: [1, 2, 3],
      c: { 'a': 'apple', 'b': 'banana' }
    }
  };
  _.each(cases, function (c) {
    it(c.input + ' should render "' + c.out + '"', function () {
      expect(swig.render(c.input, opts)).to.equal(c.out);
    });
  });

  it('throws on numbers as any argument', function () {
    expect(function () {
      swig.render('{% for a in 32 %}{% endfor %}');
    }).to.throwError(/Unexpected number "32" on line 1\./);
  });

  it('throws on any comparator', function () {
    expect(function () {
      swig.render('{% for a > 32 %}{% endfor %}');
    }).to.throwError(/Unexpected token ">" on line 1\./);
  });
});
