from pydub import AudioSegment

# Load the MP3 file
audio = AudioSegment.from_mp3('cut.mp3')

# Save the audio data to a WAV file
audio.export('cut.wav', format='wav')
