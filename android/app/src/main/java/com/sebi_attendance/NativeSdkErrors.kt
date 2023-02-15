package com.sebi_attendance


object NativeSdkErrors {
    private val SDK_ERRORS: MutableMap<String, String> = mutableMapOf()
    const val CORRUPTED_APK_FILE = "3503"
    const val INVALID_APK_URI = "3504"
    const val OLD_APK_FILE = "3505"
    const val APK_FILE_DOES_NOT_EXISTS = "3506"
    const val SYSTEM_TIME_ERROR = "3507"
    const val LOCATION_UTIL_ERROR = "3508"


    fun getError(code: String): String? {
        return SDK_ERRORS[code]
    }

}
