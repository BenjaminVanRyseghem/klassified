define(["src/testCase"], function(testCase) {
	describe("testCase", function() {
		var bTestCaseCount;

		var a = testCase.subclass(function(that, my) {
			my.name = function() {
				return "TestCase - A";
			};

			my.beforeEach = function() {
				that.isA = true;
			};

			my.isFoo = function() {
				my.it("isFoo", function() {
					my.expect(my.foo).toBe(false);
				});
			};

			my.isBar = function() {
				my.it("isBar", function() {
					my.expect(my.bar).toBe(true);
				});
			};

			my.initialize = function(spec) {
				my.super(spec);

				my.foo = false;
				my.bar = true;
			};
		});

		var b = a.subclass(function(that, my) {
			my.initialize = function(spec) {
				bTestCaseCount = 0;
				my.super(spec);
				my.foo = true;
			};

			my.beforeEach = function() {
				my.super();
				that.isB = true;
			};

			// Keep track of the number of tests run.
			my.describe = function(name, callback) {
				my.super(name, callback);
			};

			my.it = function(name, callback) {
				bTestCaseCount++;
				my.super(name, callback);
			};

			my.name = function() {
				return "TestCase - B";
			};

			my.isFoo = function() {
				my.it("isFoo", function() {
					my.expect(my.foo).toBe(true);
				});
			};
		});

		it("b testCase should have run 2 test cases", function() {
			expect(bTestCaseCount).toBe(2);
		});

		it("beforeEach is inherited", function() {
			expect(b.instance().isA).toBeTruthy();
			expect(b.instance().isB).toBeTruthy();
		});
	});
});