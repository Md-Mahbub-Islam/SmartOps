import whisper
from pydub import AudioSegment
import os
import json

model = whisper.load_model('base')

def AudioChunkizer(sound_file):

    #create folder if not exists
    if not os.path.exists('chunks'):
        os.makedirs('chunks')

    #delete contents of the folder
    for files in os.listdir('chunks'):
        os.remove('chunks/'+files)

    #get duration of audio file in seconds
    sound = AudioSegment.from_file(sound_file)
    duration = len(sound) / 1000
    print('Duration: ' + str(duration))
    #get in minutes
    duration = duration / 60
    print('Duration: ' + str(duration)+' minutes')

    #get number of chunks
    chunks = duration / 5
    
    #duration of the chunk
    d_ch = 5

    nn = int(chunks)


    for i in range(0, int(chunks)):
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
        extract.export(f"chunks/US_{StrtMin}-{EndMin}.mp3", format="mp3")
        
    #save number of chunks to json
    with open('chunks/chunk_size.json', 'w') as f:
        json.dump(nn, f)

def Chunkscribe():
    #load number of chunks
    nn = 0
    with open('chunks/chunk_size.json', 'r') as f:
        nn = json.load(f)

    print(nn)
    for i in range(0, nn):
        t_text = DoTranscribe(f'chunks/US_{i*5}-{i*5+5}.mp3')
        with open('chunks/US_{i*5}-{i*5+5}.txt', 'w') as f:
            json.dump(t_text, f)


def DoTranscribe(sound_file, language='en'):
    t_text = model.transcribe(sound_file, language='en')
    print(t_text)
    return t_text
        
    

if __name__ == '__main__':
    #AudioChunkizer('..\cut.wav')
    Chunkscribe()