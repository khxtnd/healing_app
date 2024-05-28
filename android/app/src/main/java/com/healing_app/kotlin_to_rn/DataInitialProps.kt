package com.test_integration

import android.os.Bundle
import com.healing_app.Constants

class DataInitialProps private constructor() {
    private object Holder {
        val instance = DataInitialProps()
    }

    companion object {
        fun getInstance(): DataInitialProps = Holder.instance
    }

    private var data: Bundle? = null
    fun getDataFromKotlinToRN(): Bundle? {
        if (data == null)
            data = Bundle()
        return data
    }

    fun setToScreen(toScreen: String) {
        if (data == null)
            data = Bundle()
        data!!.putString(Constants.KEY.TO_SCREEN, toScreen)

    }

    fun setName(name: String) {
        if (data == null)
            data = Bundle()
        data!!.putString(Constants.KEY.NAME, name)

    }

    fun setAge(age: Int) {
        if (data == null)
            data = Bundle()
        data!!.putInt(Constants.KEY.AGE, age)

    }

    fun clearData() {
        data?.apply {
            remove(Constants.KEY.TO_SCREEN)
            remove(Constants.KEY.AGE)
            remove(Constants.KEY.NAME)

        }

    }
}
