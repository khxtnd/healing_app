package com.healing_app.model

import android.os.Bundle

data class UserInfo(
    val username: String,
    val password: String,
    val url: String? = null
){
    fun toBundle(): Bundle = Bundle().apply {
        putString("username", username)
        putString("password", password)
        putString("url", url)
    }
}
