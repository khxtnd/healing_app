package com.healing_app

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.WritableNativeMap
import com.healing_app.databinding.ActivityMainBinding
import com.healing_app.kotlin_to_rn.EventToRN
import com.test_integration.DataInitialProps

class MainActivity : AppCompatActivity() {

    private val binding by lazy {
        ActivityMainBinding.inflate(layoutInflater)
    }

    private var count=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        DataInitialProps.getInstance().setName("khanh")
        DataInitialProps.getInstance().setAge(23)


        binding.btMoveToMain.setOnClickListener {
            DataInitialProps.getInstance().setToScreen(Constants.KEY.MAIN_SCREEN)
            val intentToRN = Intent(this, StartReactNativeActivity::class.java)
            intentToRN.flags =
                Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK

            startActivity(intentToRN)

            val handler = Handler(Looper.getMainLooper())
            val runnable = object : Runnable {
                override fun run() {
                    EventToRN.getInstance().sendEvent(WritableNativeMap().apply {
                        putInt("count7", count)
                    })

                    count++
                    handler.postDelayed(this, 3000)
                }
            }

            handler.postDelayed(runnable, 3000)
        }

        binding.btMoveToLogin.setOnClickListener {
            DataInitialProps.getInstance().setToScreen(Constants.KEY.LOGIN_SCREEN)
            val intentToRN = Intent(this, StartReactNativeActivity::class.java)
            intentToRN.flags =
                Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
            startActivity(intentToRN)
        }

    }
}
