package com.sebi_attendance

import android.content.Intent
import android.location.Location
import android.net.Uri
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import javax.annotation.Nonnull


class SANativeModule(mReactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(mReactContext) {

    @Nonnull
    override fun getName(): String {
        return MODULE_NAME
    }

    companion object {
        private const val TAG = "SEBIAttendanceAppUtils"
        const val MODULE_NAME = "SEBIAttendanceAppUtils"
    }

    @ReactMethod
    fun openAndInstallApk(apkUri: String, promise: Promise) {
        try {
            Utils.openAPKFile(apkUri, reactApplicationContext)
            promise.resolve(true)
        } catch (error: Exception) {
            when (error.message) {
                NativeSdkErrors.CORRUPTED_APK_FILE -> promise.reject(
                    error.message,
                    "APK File is corrupted"
                )
                NativeSdkErrors.INVALID_APK_URI -> promise.reject(
                    error.message,
                    "APK File path is invalid"
                )
                NativeSdkErrors.OLD_APK_FILE -> promise.reject(
                    error.message,
                    "APK File is old or obsolete"
                )
                NativeSdkErrors.APK_FILE_DOES_NOT_EXISTS -> promise.reject(
                    error.message,
                    "APK File doesn't exists"
                )
                else -> promise.reject(error.message, "Unexpected error")

            }
        }
    }

    @ReactMethod
    fun openSettings(promise: Promise) {
        try {
            val reactContext = reactApplicationContext
            val intent = Intent()
            val packageName = reactContext.packageName
            intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            intent.data = Uri.fromParts("package", packageName, null)
            reactContext.startActivity(intent)
            promise.resolve(true)
        } catch (e: java.lang.Exception) {
            promise.reject("Activity Not found", e)
        }
    }

    @ReactMethod
    fun isAutomaticDateTimeEnabled(promise: Promise) {
        try {
            val isAuto = Settings.Global.getInt(
                reactApplicationContext.contentResolver,
                Settings.Global.AUTO_TIME,
                0
            )
            promise.resolve(isAuto)
        } catch (error: Exception) {
            promise.reject(NativeSdkErrors.SYSTEM_TIME_ERROR, error.message)
        }
    }

}
