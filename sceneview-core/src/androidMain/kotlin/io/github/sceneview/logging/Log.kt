package io.github.sceneview.logging

import java.util.logging.ConsoleHandler
import java.util.logging.Level
import java.util.logging.Logger


private object AndroidLog {
    init {
        Logger.getLogger("").apply {
            addHandler(ConsoleHandler())
            level = Level.FINEST
        }
    }

    fun logWarning(tag: String, message: String) {
        Logger.getLogger(tag).log(Level.INFO, message)
    }
}


actual fun logWarning(tag: String, message: String) {
    AndroidLog.logWarning(tag, message)
}
