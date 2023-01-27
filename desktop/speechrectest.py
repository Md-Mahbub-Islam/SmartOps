import speech_recognition as sr

r = sr.Recognizer()

with sr.AudioFile("chunks/US_0-5.wav") as source:
    audio = r.record(source)

transcription = r.recognize_google(audio, show_all=True)
print(transcription)
