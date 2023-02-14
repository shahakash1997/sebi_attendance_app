package com.sebi_attendance.rnPackages

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import java.util.jar.JarFile

object Utils {
    @Throws(Exception::class)
    private fun getApkPath(apkUri: Uri): File {
        val file = File(apkUri.path)
        if (!file.exists()) throw Exception("APK_FILE_DOES_NOT_EXISTS")
        file.setReadable(true, false)
        file.setExecutable(true, false)
        file.setWritable(true, false)
        return file
    }

    private fun installApk(context: Context, apkFile: File) {
        val intent = Intent(Intent.ACTION_VIEW)
        val apkUri: Uri = FileProvider.getUriForFile(
            context,
            context.applicationContext.packageName.toString() + ".provider",
            apkFile
        )
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive")
        context.grantUriPermission(
            context.packageName,
            apkUri,
            Intent.FLAG_GRANT_READ_URI_PERMISSION
        )
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        context.startActivity(intent)
    }

    @Throws(Exception::class)
    fun openAPKFile(uriString: String, context: Context) {
        val apkUri = Uri.parse(uriString)
        val downloadedFile: File = getApkPath(apkUri)
        try {
            JarFile(downloadedFile)
        } catch (ex: Exception) {
            throw Exception("CORRUPTED_APK_FILE")
        }
        if (getFormattedDate(
                Calendar.getInstance().timeInMillis
            ) == getFormattedDate(downloadedFile.lastModified())
        ) {
            installApk(context, downloadedFile)
        } else {
            throw Exception("OLD_APK_FILE")
        }
    }

    private fun getFormattedDate(timestamp: Long): String? {
        val format = SimpleDateFormat("dd-MM-yyyy")
        return format.format(timestamp)
    }

}
