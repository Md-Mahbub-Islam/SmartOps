import tkinter as tk
from tkinter import ttk

def play_audio():
    wave_obj = sa.WaveObject.from_wave_file("audio.wav")
    play_obj = wave_obj.play()
    play_obj.wait_done()
    transcript_label.config(text="Transcript of the audio file.")

root = tk.Tk()
root.title("Audio Player")

play_button = ttk.Button(root, text="Play", command=play_audio)
play_button.pack()

transcript_label = ttk.Label(root, text="")
transcript_label.pack()

root.mainloop()