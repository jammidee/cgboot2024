
/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR        : Jammi Dee (Joel M. Damaso)
 * LOCATION      : Manila, Philippines
 * EMAIL         : jammi_dee@yahoo.com
 * CREATED DATE  : April 09, 2026 08:12 PM
 * ------------------------------------------------------------------------
 */

const respHelper = {
    success: (res, data = [], message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({
            status: statusCode,
            success: true,
            message: message,
            data: data
        });
    },

    error: (res, message = "Internal Server Error", statusCode = 500, errors = null) => {
        return res.status(statusCode).json({
            status: statusCode,
            success: false,
            message: message,
            errors: errors // Optional: for validation details
        });
    }
};

module.exports = respHelper;