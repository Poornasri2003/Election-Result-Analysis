import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import streamlit as st
import os

# Define the alliances (all party names in lowercase without spaces)
alliances = {
    'INDIA': [
        'dravidamunnetrakazhagam', 'kongunadumakkaldesiakkatchi', 'indiannationalcongress',
        'communistpartyofindia', 'communistpartyofindiamarxist', 'viduthalaichiruthaigalkatchi',
        'indianunionmuslimleague', 'marumalarchidravidamunnetrakazhagam'
    ],
    'AIADMK': [
        'allindiaannadravidamunnetrakazhagam', 'puthiyatamilagam', 'socialdemocraticpartyofindia',
        'desiyamurpokkudravidakazhagam'
    ],
    'NDA': [
        'bharatiyajanataparty', 'indhiyajananayagakatchi', 'inthiyamakkalkalvimunnetrakazhagam',
        'puthiyaneedhikatchi', 'tamizhagamakkalmunnetrakazhagam', 'pattalimakkalkatchi',
        'tamilmaaniliacongressmoopanar', 'ammamakkalmunnettrakzagam'
    ],
    'INDEPENDENT PARTY': [
        'bahujansamajparty', 'naamtamilarkatchi', 'naadaalummakkalkatchi', 'desiyamakkalsakthikatchi',
        'veeraththiyagivishwanatadhossthozhhialalarkalkkatchi', 'ganasangampartyofindia', 'bahujandravidaparty',
        'thakkamkatchi', 'virokevirindianparty', 'annamgrdravidamakkalkalgam', 'aravoormunnetrakazhagam',
        'samaniyamakkalnanalakatchi', 'bharatiyaprajaaikyataparty',
        'puthiyamakkalttamilddesamkatchi', 'tamizhhagamurpokkumakkalkatchi', 'ulzaipalimakkalkatchy',
        'unitedrepublicanpartyofindia', 'aanaithinthiyajananayakapathukappukazhagam',
        'allindiajananayakamakkalkazhagam', 'ambedkariteepartyofindia', 'annapuratchithalaivarammadravidamunnetrakazhagam',
        'chennaiyouthparty', 'dhesiyamakkalkazhagam', 'jebamaniijanata', 'mahathamamakkalmunnetrakazhakam',
        'rashtriyasamajpaksha', 'socialistunitycentreofinddiacommunist', 'tamilagamakkalthannurimaikatchi',
        'tamilarmakkalkatchi', 'tamilmanilamurpokkudravidakazhagam', 'ahimsasocialistparty',
        'allindiauzhavargaluzhaippalargalkatchi', 'allindiayouthdevelopmentparty', 'anaithuindiamakkalkatchi',
        'annamakkalkatchi', 'hindhusamajparty', 'hindustanjantaparty', 'humanityforpeaceparty', 'karunaaduparty',
        'makkalnanalakazhagam', 'makkalnnalvaazhvukkatchi', 'naamindiiarparty', 'namindianaamindiiyarkatchi',
        'nationalmhahasabhaparty', 'newgenerationpeoplesparty', 'punnagaidesamparty', 'republicanpartyofindiasivaraj',
        'tamilagamakkalnanalakatchi', 'tipusultanparty', 'vidiyalaithedumiindhiyargalparty', 'vidhuthalaikkalamkatchi','veeraththiyagiviswanathadossthozhilalarkalkatchi',
        'anticorruptiondynamicparty','tamilnadumakkalnalvazhvuperiyakkam','socialistunitycentreOfindiacommunist','jebamanijanata'
, 'mahathmamakkalmunnetrakazhakam',
    'aravormunnetrakazhagam',
    'tamizhagamurpokkumakkalkatchi',
    'nationalmahasabhaparty',
    'tamilmaanilacongressmoopanar',
    'samaniyamakkalnalakatchi',
    'vidhuthalaikkalamkatchi',
    'ambedkariteepartyofindia',
    'newgenerationpeoplesparty',
    'puthiyamakkaltamildesamkatchi',
        'vidiyalaithedumiindhiyargalparty',
        'ammamakkalmunnettrakazagam',
        'naamindiiarparty',
        'makkalnnalvaazhvukkatchi',
        'namindianaamindiyarkatchi',
        'makkalnanalakazhagam',
        'hindhusamajparty',
        'tamilagamakkalnanalakatchi',
        'allindiapeopledevelopmentparty',
         'socialisunitycentreofindiacommunist',
        'viduthalaikalamkatchi',
        'ambedkaritepartyofindia',
        "newgenerationpeople'sparty",
        'puthiyamakkalttamilddesamkatchi',
        'vidiyalaithedumindhiyargalparty',
        'naamindiarparty',
        'makkalnalvaazhvukkatchi',
       
        'makkalnalakazhagam',
        'hindusamajparty',
        'tamilagamakkalnalakatchi'],
    'NOTA':['noneoftheabove'],
    'INDEPENDENT':['independent']
}

# Function to categorize parties based on the alliances
def categorize_party(party):
    party_cleaned = party.lower().replace(' ', '').replace('(', '').replace(')', '')
    for alliance, parties in alliances.items():
        if party_cleaned in parties:
            return alliance
    return 'INDEPENDENT'

# Streamlit app
st.title('2024 Election Results Analysis')

# Read the fixed CSV file
file_path = "2024_results.csv"  # Update with your file path
if os.path.exists(file_path):
    df = pd.read_csv(file_path)
    # st.write(df.head())  # Commented out to remove printing the DataFrame
else:
    st.error("CSV file not found.")
    st.stop()

# Add alliance category to the DataFrame
df['category'] = df['party'].apply(categorize_party)

# Plot the stacked vertical bar chart directly
wards = df['ward'].unique()
alliances = df['category'].unique()
num_wards = len(wards)
bar_width = 0.5

fig, ax = plt.subplots(figsize=(14, 8))

bottom = np.zeros(num_wards)

for i, alliance in enumerate(alliances):
    alliance_votes = []
    for ward in wards:
        ward_data = df[(df['ward'] == ward) & (df['category'] == alliance)]
        total_votes = ward_data['votes'].sum() if not ward_data.empty else 0
        alliance_votes.append(total_votes)
    percentages = np.array(alliance_votes) / np.sum(alliance_votes) * 100
    ax.bar(wards, percentages, bar_width, bottom=bottom, label=alliance)
    bottom += percentages

ax.set_ylabel('Vote Percentage (%)')
ax.set_xlabel('Wards')
ax.set_title('Vote Percentage by Alliance in Each Ward')
ax.legend()
ax.grid(axis='y')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()

# Display the plot using Streamlit
st.pyplot(fig)
