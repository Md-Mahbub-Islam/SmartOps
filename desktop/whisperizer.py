import whisper
from pydub import AudioSegment
import os

model = whisper.load_model('base')

def AudioTrunkizer(sound_file):

    #create folder if not exists
    if not os.path.exists('trunks'):
        os.makedirs('trunks')

    #delete contents of the folder
    for files in os.listdir('trunks'):
        os.remove('trunks/'+files)

    #get duration of audio file in seconds
    sound = AudioSegment.from_file(sound_file)
    duration = len(sound) / 1000
    print('Duration: ' + str(duration))
    #get in minutes
    duration = duration / 60
    print('Duration: ' + str(duration)+' minutes')

    #get number of trunks
    trunks = duration / 5
    
    #duration of the chunk
    d_ch = 5

    nn = 0 #number of chunks


    for i in range(0, int(trunks)):
        StrtMin = i*d_ch
        StrtSec = 0
        EndMin = i*d_ch + d_ch
        EndSec = 0
        # Time to milliseconds conversion
        StrtTime = StrtMin*60*1000+StrtSec*1000
        EndTime = EndMin*60*1000+EndSec*1000
        # Opening file and extracting portion of it
        extract = sound[StrtTime:EndTime]
        # Saving file in required location
        extract.export(f"trunks/US_{StrtMin}-{EndMin}.mp3", format="mp3")


def DoTranscribe(sound_file, language='en'):
    print('Transcribing ' + sound_file)
    text = model.transcribe(sound_file)
    print(text)


if __name__ == '__main__':
    AudioTrunkizer('..\cut.wav')