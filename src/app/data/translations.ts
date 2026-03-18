import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Header
    'app.title': 'Fuel Tracker',
    'app.subtitle': 'Real-time fuel availability',
    'app.location': 'Location',
    'app.search': 'Search stations...',
    'filter.all': 'All Stations',
    'filter.found': 'Found',
    'filter.stock': 'Stock',
    'filter.adjustSearch': 'Try adjusting your search or filters',

    // View Modes
    'view.map': 'Map',
    'view.list': 'List',
    'view.locate': 'Locate Me',

    // Sort
    'sort.status': 'Status',
    'sort.distance': 'Distance',
    'sort.queue': 'Queue',

    // Menu / Navigation
    'nav.home': 'Home',
    'nav.map': 'Map',
    'nav.submit': 'Submit Update',
    'nav.feed': 'Live Feed',
    'nav.settings': 'Settings',

    // Fuel Status
    'status.available': 'Available',
    'status.limited': 'Limited',
    'status.out-of-stock': 'Out of Stock',
    'status.not-available': 'Not Available',
    'status.unknown': 'Unknown Status',

    // Fuel Types
    'fuel.petrol92': 'Petrol 92',
    'fuel.petrol95': 'Petrol 95',
    'fuel.diesel': 'Auto Diesel',
    'fuel.kerosene': 'Kerosene',

    // Station Details
    'station.queue': 'Queue',
    'station.waiting': 'Waiting Time',
    'station.lastUpdated': 'Last Updated',
    'station.nearby': 'Nearby Stations',
    'station.distance': 'Distance',
    'station.wait': 'Wait',
    'station.mins': 'mins',
    'station.km': 'km',
    'station.vehicles': 'vehicles',
    'station.shareTitle': 'Share Station',
    'station.shareText': 'Check fuel availability at',
    'station.linkCopied': 'Link copied to clipboard!',
    'station.getDirections': 'Get Directions',
    'station.updateStatus': 'Update Status',
    'station.recentUpdates': 'Recent Community Updates',
    'station.reportUpdate': 'Report Update',
    'details.availability': 'Fuel Availability',

    // Settings
    'settings.title': 'Settings',
    'settings.preference': 'Preference Management',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.info': 'Information',
    'settings.about': 'Fuel Watch LK',
    'settings.version': 'Version',
    'settings.enabled': 'Enabled',
    'settings.disabled': 'Disabled',
    'settings.langChanged': 'Language changed to',

    // Submit Page
    'submit.title': 'Submit Update',
    'submit.subtitle': 'Help others by sharing real-time fuel status',
    'submit.station': 'Select Fuel Station *',
    'submit.chooseStation': 'Choose a station...',
    'submit.yourName': 'Your Name *',
    'submit.yourNamePlaceholder': 'e.g., Kamal Silva',
    'submit.status': 'Overall Station Status *',
    'submit.queue': 'Queue Length (vehicles)',
    'submit.wait': 'Waiting Time (minutes)',
    'submit.fuelAvailability': 'Fuel Type Availability',
    'submit.message': 'Additional Information (Optional)',
    'submit.messagePlaceholder': 'e.g., Queue moving fast, diesel finishing soon...',
    'submit.button': 'Submit Update',
    'submit.submitting': 'Submitting...',
    'submit.success': 'Update submitted successfully!',
    'submit.successDesc': 'Thank you for helping the community!',
    'submit.errorFields': 'Please fill in all required fields',
    'submit.out': 'Out',
    'submit.notAvailable': 'N/A',

    // Live Feed
    'feed.title': 'Community Feed',
    'feed.subtitle': 'Real-time user updates',
    'feed.activity': 'Community Activity',
    'feed.updates': 'updates in the last hour',
    'feed.noUpdates': 'No recent updates',
    'feed.loadMore': 'Load More Updates',
    'feed.live': 'LIVE',

    // Locations
    'location.ratnapura': 'Ratnapura',
    'location.colombo': 'Colombo',
    'location.kandy': 'Kandy',
    'location.galle': 'Galle',
    'location.jaffna': 'Jaffna',
    'location.allIsland': 'All Island',
  },
  si: {
    // App Header
    'app.title': 'ඉන්ධන පරීක්ෂක',
    'app.subtitle': 'සජීවී ඉන්ධන පවතින බව',
    'app.location': 'ස්ථානය',
    'app.search': 'පිරවුම්හල් සොයන්න...',
    'filter.all': 'සියලුම පිරවුම්හල්',
    'filter.found': 'හමුවුණා',
    'filter.stock': 'ඉතිරි',
    'filter.adjustSearch': 'සෙවුම හෝ පෙරහන් වෙනස් කර නැවත උත්සාහ කරන්න',

    // View Modes
    'view.map': 'සිතියම',
    'view.list': 'ලැයිස්තුව',
    'view.locate': 'මගේ ස්ථානය',

    // Sort
    'sort.status': 'තත්ත්වය',
    'sort.distance': 'දුර',
    'sort.queue': 'පෝලිම',

    // Menu / Navigation
    'nav.home': 'මුල් පිටුව',
    'nav.map': 'සිතියම',
    'nav.submit': 'යාවත්කාලීන කරන්න',
    'nav.feed': 'සජීවී පුවත්',
    'nav.settings': 'සැකසුම්',

    // Fuel Status
    'status.available': 'ඇත',
    'status.limited': 'සීමිතයි',
    'status.out-of-stock': 'නැත',
    'status.not-available': 'ලබාගත නොහැක',
    'status.unknown': 'නොදන්නා තත්ත්වය',

    // Fuel Types
    'fuel.petrol92': 'පෙට්‍රල් 92',
    'fuel.petrol95': 'පෙට්‍රල් 95',
    'fuel.diesel': 'ඔටෝ ඩීසල්',
    'fuel.kerosene': 'භූමිතෙල්',

    // Station Details
    'station.queue': 'පෝලිම',
    'station.waiting': 'පොරොත්තු කාලය',
    'station.lastUpdated': 'අවසන් වරට යාවත්කාලීන කළේ',
    'station.nearby': 'අවට පිරවුම්හල්',
    'station.distance': 'දුර',
    'station.wait': 'පොරොත්තු',
    'station.mins': 'විනාඩි',
    'station.km': 'කි.මී.',
    'station.vehicles': 'වාහන',
    'station.shareTitle': 'තොරතුරු බෙදාගන්න',
    'station.shareText': 'ඉන්ධන පවතින බව පරීක්ෂා කරන්න',
    'station.linkCopied': 'ලින්ක් එක කොපි කරගත්තා!',
    'station.getDirections': 'මඟ පෙන්වීම් ලබාගන්න',
    'station.updateStatus': 'තොරතුරු යාවත්කාලීන කරන්න',
    'station.recentUpdates': 'ප්‍රජාවගෙන් ලැබුණු අලුත්ම තොරතුරු',
    'station.reportUpdate': 'තොරතුරු ලබාදෙන්න',
    'details.availability': 'ඉන්ධන පවතින බව',

    // Settings
    'settings.title': 'සැකසුම්',
    'settings.preference': 'මනාප කළමනාකරණය',
    'settings.appearance': 'පෙනුම',
    'settings.darkMode': 'අඳුරු මාදිලිය',
    'settings.language': 'භාෂාව',
    'settings.info': 'තොරතුරු',
    'settings.about': 'Fuel Watch LK ගැන',
    'settings.version': 'අනුවාදය',
    'settings.enabled': 'සක්‍රීයයි',
    'settings.disabled': 'අක්‍රීයයි',
    'settings.langChanged': 'භාෂාව වෙනස් කරන ලදි:',

    // Submit Page
    'submit.title': 'තොරතුරු ලබාදෙන්න',
    'submit.subtitle': 'තත්‍ය කාලීන තොරතුරු බෙදා ගැනීමෙන් අනෙක් අයට උදව් කරන්න',
    'submit.station': 'පිරවුම්හල තෝරන්න *',
    'submit.chooseStation': 'පිරවුම්හලක් තෝරන්න...',
    'submit.yourName': 'ඔබේ නම *',
    'submit.yourNamePlaceholder': 'නිද: කමල් සිල්වා',
    'submit.status': 'පිරවුම්හලේ තත්ත්වය *',
    'submit.queue': 'පෝලිමේ දිග (වාහන)',
    'submit.wait': 'බලා සිටිය යුතු කාලය (විනාඩි)',
    'submit.fuelAvailability': 'ඉන්ධන වර්ග පවතින බව',
    'submit.message': 'අමතර තොරතුරු (අවශ්‍ය නම් පමණි)',
    'submit.messagePlaceholder': 'නිද: පෝලිම ඉක්මනින් ගමන් කරයි, ඩීසල් ඉක්මනින් අවසන් වීමට ඉඩ ඇත...',
    'submit.button': 'යාවත්කාලීන කරන්න',
    'submit.submitting': 'යාවත්කාලීන වෙමින් පවතී...',
    'submit.success': 'යාවත්කාලීන කිරීම සාර්ථකයි!',
    'submit.successDesc': 'ප්‍රජාවට උදව් කිරීම ගැන ඔබට ස්තුතියි!',
    'submit.errorFields': 'කරුණාකර අවශ්‍ය සියලුම ක්ෂේත්‍ර පුරවන්න',
    'submit.out': 'ඉවරයි',
    'submit.notAvailable': 'නැත',

    // Live Feed
    'feed.title': 'සජීවී යාවත්කාලීන',
    'feed.subtitle': 'පරිශීලකයින්ගෙන් සජීවී තොරතුරු',
    'feed.activity': 'ප්‍රජා ක්‍රියාකාරකම්',
    'feed.updates': 'පසුගිය පැය තුළ යාවත්කාලීන කිරීම්',
    'feed.noUpdates': 'මෑතකදී යාවත්කාලීන කිරීම් නැත',
    'feed.loadMore': 'තවත් තොරතුරු පෙන්වන්න',
    'feed.live': 'සජීවී',

    // Locations
    'location.ratnapura': 'රත්නපුර',
    'location.colombo': 'කොළඹ',
    'location.kandy': 'මහනුවර',
    'location.galle': 'ගාල්ල',
    'location.jaffna': 'යාපනය',
  },
  ta: {
    // App Header
    'app.title': 'எரிபொருள் கண்காணிப்பான்',
    'app.subtitle': 'உண்மையான எரிபொருள் இருப்பு விபரம்',
    'app.location': 'இடம்',
    'app.search': 'நிலையங்களைத் தேடுங்கள்...',
    'filter.all': 'அனைத்து நிலையங்களும்',
    'filter.found': 'கண்டுபிடிக்கப்பட்டது',
    'filter.stock': 'இருப்பில் உள்ளது',
    'filter.adjustSearch': 'உங்கள் தேடல் அல்லது வடிப்பான்களை மாற்ற முயற்சிக்கவும்',

    // View Modes
    'view.map': 'வரைபடம்',
    'view.list': 'பட்டியல்',
    'view.locate': 'என்னைக் கண்டுபிடி',

    // Sort
    'sort.status': 'நிலை',
    'sort.distance': 'தூரம்',
    'sort.queue': 'வரிசை',

    // Menu / Navigation
    'nav.home': 'முகப்பு',
    'nav.map': 'வரைபடம்',
    'nav.submit': 'தகவலைப் பகிரவும்',
    'nav.feed': 'நேரடித் தகவல்கள்',
    'nav.settings': 'அமைப்புகள்',

    // Fuel Status
    'status.available': 'இருக்கின்றது',
    'status.limited': 'குறைவாக உள்ளது',
    'status.out-of-stock': 'இல்லை',
    'status.not-available': 'கிடைக்கவில்லை',
    'status.unknown': 'தெரியாத நிலை',

    // Fuel Types
    'fuel.petrol92': 'பெற்றோல் 92',
    'fuel.petrol95': 'பெற்றோல் 95',
    'fuel.diesel': 'ஓட்டோ டீசல்',
    'fuel.kerosene': 'மண்ணெண்ணெய்',

    // Station Details
    'station.queue': 'வரிசை',
    'station.waiting': 'காத்திருக்கும் நேரம்',
    'station.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது',
    'station.nearby': 'அருகிலுள்ள நிலையங்கள்',
    'station.distance': 'தூரம்',
    'station.wait': 'காத்திருப்பு',
    'station.mins': 'நிமிடங்கள்',
    'station.km': 'கி.மீ.',
    'station.vehicles': 'வாகனங்கள்',
    'station.shareTitle': 'பகிரவும்',
    'station.shareText': 'எரிபொருள் இருப்பைச் சரிபார்க்கவும்',
    'station.linkCopied': 'இணைப்பு நகலெடுக்கப்பட்டது!',
    'station.getDirections': 'வழிமுறைகளைப் பெறுங்கள்',
    'station.updateStatus': 'நிலையை இற்றைப்படுத்துக',
    'station.recentUpdates': 'சமீபத்திய சமூக புதுப்பிப்புகள்',
    'station.reportUpdate': 'தகவலைப் பகிரவும்',
    'details.availability': 'எரிபொருள் இருப்பு',

    // Settings
    'settings.title': 'அமைப்புகள்',
    'settings.preference': 'விருப்ப மேலாண்மை',
    'settings.appearance': 'தோற்றம்',
    'settings.darkMode': 'இரவு முறை',
    'settings.language': 'மொழி',
    'settings.info': 'தகவல்',
    'settings.about': 'Fuel Watch LK பற்றி',
    'settings.version': 'பதிப்பு',
    'settings.enabled': 'செயலில் உள்ளது',
    'settings.disabled': 'செயலிழக்கச் செய்யப்பட்டுள்ளது',
    'settings.langChanged': 'மொழி மாற்றப்பட்டது:',

    // Submit Page
    'submit.title': 'தகவலைப் பகிரவும்',
    'submit.subtitle': 'உண்மையான தகவல்களைப் பகிர்வதன் மூலம் மற்றவர்களுக்கு உதவுங்கள்',
    'submit.station': 'நிலையத்தைத் தேர்ந்தெடுக்கவும் *',
    'submit.chooseStation': 'ஒரு நிலையத்தைத் தேர்ந்தெடுக்கவும்...',
    'submit.yourName': 'உங்கள் பெயர் *',
    'submit.yourNamePlaceholder': 'உதாரணம்: கமல் சில்வா',
    'submit.status': 'ஒட்டுமொத்த நிலை *',
    'submit.queue': 'வரிசையின் நீளம் (வாகனங்கள்)',
    'submit.wait': 'காத்திருக்கும் நேரம் (நிமிடங்கள்)',
    'submit.fuelAvailability': 'எரிபொருள் வகை இருப்பு',
    'submit.message': 'மேலதிக தகவல் (விருப்பமானால்)',
    'submit.messagePlaceholder': 'உதாரணம்: வரிசை வேகமாக நகர்கிறது, டீசல் விரைவில் தீர்ந்துவிடும்...',
    'submit.button': 'தகவலை அனுப்பவும்',
    'submit.submitting': 'அனுப்பப்படுகிறது...',
    'submit.success': 'தகவல் வெற்றிகரமாக அனுப்பப்பட்டது!',
    'submit.successDesc': 'சமூகத்திற்கு உதவியதற்கு மிக்க நன்றி!',
    'submit.errorFields': 'தயவுசெய்து தேவையான அனைத்து புலங்களையும் நிரப்பவும்',
    'submit.out': 'இல்லை',
    'submit.notAvailable': 'இல்லை',

    // Live Feed
    'feed.title': 'நேரடித் தகவல்கள்',
    'feed.subtitle': 'பயனர்களிடமிருந்து பெறப்பட்ட சமீபத்திய தகவல்கள்',
    'feed.noUpdates': 'தகவல்கள் எதுவும் இல்லை',
    'feed.activity': 'சமூக செயல்பாடு',
    'feed.updates': 'கடந்த ஒரு மணி நேரத்தில் புதுப்பிப்புகள்',
    'feed.loadMore': 'மேலும் புதுப்பிப்புகளை ஏற்றவும்',
    'feed.live': 'நேரலை',

    // Locations
    'location.ratnapura': 'இரத்தினபுரி',
    'location.colombo': 'கொழும்பு',
    'location.kandy': 'கண்டி',
    'location.galle': 'காலி',
    'location.jaffna': 'யாழ்ப்பாணம்',
    'location.allIsland': 'நாடளாவிய ரீதியில்',
  }
};
