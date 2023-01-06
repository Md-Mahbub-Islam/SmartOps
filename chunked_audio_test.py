import soundfile as sf
import sounddevice as sd

import wave


def main():

    # Open the WAV file
    with sf.SoundFile('cut.wav') as f:
        # Set the parameters for the audio chunk
        chunk_size = 1024
        channels = f.channels
        sample_rate = f.samplerate

        # Iterate over the audio data a chunk at a time
        for chunk in sf.blocks(f, chunk_size):
            # Play the audio chunk
            sd.play(chunk, sample_rate=sample_rate)

            # Wait for the playback to finish
            sd.wait()
            print("chunked")

if __name__ == '__main__':
    main()