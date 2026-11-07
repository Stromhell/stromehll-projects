import re,sys,os
R={'24th':'twenty-fourth','25th':'twenty-fifth','20th':'twentieth','6th':'sixth','26th':'twenty-sixth',
'1982':'nineteen eighty-two','1223':'twelve twenty-three','1773':'seventeen seventy-three','1841':'eighteen forty-one',
'1930s':'nineteen-thirties','1863':'eighteen sixty-three','1066':'ten sixty-six','1377':'thirteen seventy-seven',
'1834':'eighteen thirty-four','1848':'eighteen forty-eight','1500s':'fifteen hundreds','1600s':'sixteen hundreds',
'200s':'two hundreds','336':'three thirty-six','year 200':'year two hundred','year 800':'year eight hundred','28':'twenty-eight','300':'three hundred',
'Pachon':'Pa-khon','Koleda':'Ko-leh-da','Jultomte':'Yool-tomteh','Joulupukki':'Yo-loo-pookey','La Befana':'La Beh-fahna',
'Christkind':'Krist-kind','Sinterklaas':'Sinter-klahs','Eid al-Fitr':'Eed al-Fitter','Invictus':'In-vik-tus','Livonia':'Li-vonia'}
def fix(s):
    for k in sorted(R,key=len,reverse=True): s=re.sub(r'(?<![\w-])'+re.escape(k)+r'(?![\w])',R[k],s)
    return s
for a in range(7):
    rows=[l.rstrip('\n').split('\t') for l in open(f'out/voice/scripts/act{a}.tsv') if l.strip()]
    d=f'vo/act{a}'; os.makedirs(d,exist_ok=True)
    open(f'{d}/ids.txt','w').write('\n'.join(r[0] for r in rows)+'\n')
    open(f'{d}/say.txt','w').write('\n\n'.join(fix(r[1]) for r in rows)+'\n')
