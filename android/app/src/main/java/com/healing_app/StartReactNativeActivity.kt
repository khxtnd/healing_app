package com.healing_app

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.test_integration.DataInitialProps

class StartReactNativeActivity : ReactActivity() {

    override fun getMainComponentName(): String = "healing_app"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        val data= DataInitialProps.getInstance().getDataFromKotlinToRN()
        return MainActivityDelegate(this, mainComponentName,data)
    }

    class MainActivityDelegate(
        activity: ReactActivity?,
        mainComponentName: String?,
        data: Bundle?
    ) : ReactActivityDelegate(activity, mainComponentName) {
        private var dataFromKotlinToRN: Bundle? = data

        override fun getLaunchOptions(): Bundle? {
            return dataFromKotlinToRN
        }

        override fun createRootView(): ReactRootView {
            return ReactRootView(context)
        }
    }
}