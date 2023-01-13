import sys, os
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout
from PyQt5.QtCore import Qt, QThread, pyqtSignal
from PyQt5.QtGui import QPixmap

from qt_material import apply_stylesheet

import pydub



class CutAudioWorker(QThread):
    audio_loaded = pyqtSignal(str)

    def __init__(self, file_path):
        super().__init__()
        self.file_path = file_path

    def run(self):
        #image_loaded.emit(self.file_path)
        print(self.file_path)

class ImageLabel(QLabel):
    def __init__(self):
        super().__init__()

        self.setAlignment(Qt.AlignCenter)
        self.setText('Drop here')
        self.setStyleSheet('border: 2px dashed #aaa; font-size: 20px;')


class DropDemo(QWidget):
    def __init__(self):
        super().__init__()
        self.resize(400,400)
        self.setAcceptDrops(True)

        mainLayout = QVBoxLayout()

        self.photViewer = ImageLabel()
        mainLayout.addWidget(self.photViewer)



        self.setLayout(mainLayout)

    def dragEnterEvent(self, event):
        event.accept()

    def dragMoveEvent(self, event):
        event.accept()

    def dropEvent(self, event):
        if event.mimeData().hasUrls():
            event.setDropAction(Qt.CopyAction)
            file_path = event.mimeData().urls()[0].toLocalFile()
            self.photViewer.setText(file_path)

            self.worker = CutAudioWorker(file_path)
            self.worker.start()

    def set_image(self, file_path):
        self.photViewer.setPixmap(QPixmap(file_path))


app = QApplication(sys.argv)
demo = DropDemo()

apply_stylesheet(app, theme='dark_blue.xml')
demo.show()
sys.exit(app.exec_())