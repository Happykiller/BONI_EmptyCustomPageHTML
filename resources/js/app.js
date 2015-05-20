//# sourceURL=app.js
// Library of tools for the exemple

/**
 * @author FRO
 * @date 15/05/06
 */

(function() {
    'use strict';

    var
        /* version */
        VERSION = '0.1',

        _var = {
            'hello' : 12
        };


    ////////////////////////// PRIVATE METHODS ////////////////////////

	/**
	 * @name _init
	 * @desc Initialize
	 */
    function _init() {
        //
    }

    ////////////////////////// PUBLIC METHODS /////////////////////////

    $.app = {
        /* Version number */
        version: VERSION,

        /**
         * @name exemple
         * @desc Hello
         * @p_param{string} param
         * @returns {boolean}
         */
        exemple: function(p_param) {
            try {
                return true;
            } catch (er) {
                console.log(0, "ERROR($.app.exemple):" + er.message);
                return false;
            }
        }
    };

    // Initialize
    _init();

})();