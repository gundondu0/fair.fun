#[test_only]
module fair_fun::prebuyer_tests {
    // uncomment this line to import the module
    use fair_fun::prebuyer;

    const ENotImplemented: u64 = 0;

    #[test]
    fun test_fair_fun() {
    }

    #[test, expected_failure(abort_code = ::fair_fun::fair_fun_tests::ENotImplemented)]
    fun test_fair_fun_fail() {
        abort ENotImplemented
    }
}

