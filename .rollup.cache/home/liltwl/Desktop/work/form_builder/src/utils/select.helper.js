import { __assign } from "tslib";
export var selectStyles = {
    control: function (provided, state) { return (__assign(__assign({}, provided), { '&:hover': 'unset', borderWidth: '1px', borderColor: state.isFocused
            ? 'rgba(69, 173, 149, 1)'
            : 'rgba(209, 213, 219, 1)', boxShadow: 'none', padding: '0.25rem 0.15rem', fontSize: '0.875rem', lineHeight: '1.25rem', color: 'rgba(31, 41, 55, 1)' })); },
    option: function (provided, state) { return (__assign(__assign({}, provided), { fontSize: '0.875rem', lineHeight: '1.25rem', color: 'rgba(31, 41, 55, 1)', backgroundColor: state.isFocused ? 'rgba(193, 245, 241, .7)' : '#ffffff' })); },
    indicatorSeparator: function (provided, state) { return ({
        display: 'none',
    }); },
    indicatorsContainer: function (provided, state) { return ({
        width: '35px',
        color: 'rgba(31, 41, 55, 1)',
    }); },
};
export var selectStylesWithError = function (error) { return ({
    control: function (provided, state) { return (__assign(__assign({}, provided), { '&:hover': 'unset', borderWidth: '1px', borderColor: error
            ? state.isFocused
                ? 'rgba(248, 113, 113, 1)'
                : 'rgba(252, 165, 165, 1)'
            : state.isFocused
                ? 'rgba(69, 173, 149, 1)'
                : 'rgba(209, 213, 218, 1)', boxShadow: 'none', padding: '0.25rem 0.15rem', fontSize: '0.875rem', lineHeight: '1.25rem', color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)' })); },
    option: function (provided, state) { return (__assign(__assign({}, provided), { fontSize: '0.875rem', lineHeight: '1.25rem', color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)', backgroundColor: state.isFocused ? 'rgba(193, 245, 241, .7)' : '#ffffff' })); },
    indicatorSeparator: function (provided, state) { return ({
        display: 'none',
    }); },
    indicatorsContainer: function (provided, state) { return ({
        width: '35px',
        color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)',
    }); },
}); };
export var supplySelectStylesWithError = function (error) { return ({
    control: function (provided, state) { return (__assign(__assign({}, provided), { '&:hover': 'unset', borderWidth: '1px', borderColor: error
            ? state.isFocused
                ? 'rgba(248, 113, 113, 1)'
                : 'rgba(252, 165, 165, 1)'
            : state.isFocused
                ? 'rgba(69, 173, 149, 1)'
                : 'rgba(209, 213, 218, 1)', boxShadow: 'none', padding: ' ', fontSize: '0.65rem', lineHeight: '1rem', color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)' })); },
    option: function (provided, state) { return (__assign(__assign({}, provided), { fontSize: '0.65rem', lineHeight: '1rem', padding: ' 0.4rem ', color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)', backgroundColor: state.isFocused ? 'rgba(193, 245, 241, .7)' : '#ffffff' })); },
    indicatorSeparator: function (provided, state) { return ({
        display: 'none',
    }); },
    indicatorsContainer: function (provided, state) { return ({
        width: '35px',
        color: error ? 'rgba(248, 113, 113, 1)' : 'rgba(31, 41, 55, 1)',
    }); },
}); };
//# sourceMappingURL=select.helper.js.map