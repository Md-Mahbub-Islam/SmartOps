from PyQt5 import QtCore, QtGui, QtWidgets, QtWebEngineWidgets, QtWebEngineCore, QtWebChannel
import sys
from PyQt5.QtCore import QThread, pyqtSignal, QObject, QUrl, QTimer


import threading
from pydub import AudioSegment
from pydub.playback import play
import json

trt = "data.json"


class UpdateLabel(QtCore.QThread):
    def __init__(self, parent=None):
        super().__init__(parent)

    def run(self, time, ui):
        tt = int(time)
        ui.label.setText(tt)

class SoundThread(QtCore.QThread):
    def __init__(self, parent=None):
        super().__init__(parent)

    def run(self):
        sound = AudioSegment.from_wav("../cut.wav")
        play(sound)
        self.finished.emit()

class MapThread(QtCore.QThread):
    def __init__(self, parent=None):
        super().__init__(parent)

    def run(self):
        
        self.finished.emit()

class MapWindow(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Map")
        self.webEngineView = QtWebEngineWidgets.QWebEngineView()
        self.webEngineView.setUrl(QtCore.QUrl("https://www.google.com/maps"))
        layout = QtWidgets.QVBoxLayout(self)
        layout.addWidget(self.webEngineView)

time = 0
class MainWindow(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        self.setWindowTitle("Chatter")
        self.setMinimumSize(1000, 600)

        # Set gradient background
        self.setAutoFillBackground(True)
        gradient = QtGui.QLinearGradient(0, 0, 0, 1)
        gradient.setCoordinateMode(QtGui.QGradient.ObjectBoundingMode)
        gradient.setColorAt(0.0, QtGui.QColor(0, 0, 0))
        gradient.setColorAt(1.0, QtGui.QColor(100, 100, 100))
        palette = self.palette()
        palette.setBrush(QtGui.QPalette.Window, QtGui.QBrush(gradient))
        self.setPalette(palette)
        # Create big font white text in the middle
        self.label = QtWidgets.QLabel("Hello World!", self)
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setStyleSheet("color: white; font: 15pt; font-weight: bold; width: 100%;")
        self.setCentralWidget(self.label)

        # Create map button on top left
        self.mapButton = QtWidgets.QPushButton(self)
        self.mapButton.setIcon(QtGui.QIcon("map.png"))
        self.mapButton.setIconSize(QtCore.QSize(60, 60))
        self.mapButton.setFixedSize(60, 60)
        self.mapButton.setFlat(True)
        self.mapButton.move(10, 10)
        self.mapButton.clicked.connect(self.openMap)


        # Create close button on top right
        close_button = QtWidgets.QPushButton(self)
        close_button.setIcon(QtGui.QIcon("close.png"))
        close_button.setIconSize(QtCore.QSize(60, 60))
        close_button.setFixedSize(60, 60)
        close_button.setFlat(True)
        close_button.move(self.width()-80, 10)
        close_button.clicked.connect(self.closeApp)

        # Remove title bar
        self.setWindowFlag(QtCore.Qt.FramelessWindowHint)

        self.sound_thread = SoundThread()
        self.sound_thread.finished.connect(self.sound_thread.deleteLater)
        self.sound_thread.start()


        timer = QTimer(self)
        timer.timeout.connect(self.update_label)
        timer.start(1000)


    
    def closeApp(self):
        QtCore.QCoreApplication.instance().quit()


    def openMap(self):
        self.map_window = MapWindow(self)
        self.map_window.show()



    def update_label(self):
        #get current running time
        global time
        with open(trt, "r") as f:
            tr = json.load(f)
        
        segments = tr["segments"]
        #print(f"Time: {time}")
        for segment in segments:
            if segment["start"] <= time <= segment["end"]:
                self.label.setText(segment["text"])
                break


        time +=1


if __name__ == "__main__":
    
    app = QtWidgets.QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())