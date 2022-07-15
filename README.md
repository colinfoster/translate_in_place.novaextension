**Translate In Place** (TIP) will translate highlighted text into your currently selected target language. TIP is Powered by Google Translate and *your own* Google \"Cloud Translation API\" key. My understanding of their pricing (at the time this was written) is that it's free for the first 500,000-characters/month.

Since Google Cloud has hundreds of services, setting up a Cloud Translation API key takes a little effort through a somewhat convoluted maze, but I've tried to document process below. It should take about 10 minutes.

Google Cloud pricing is a little unclear, so you should definitely make yourself comfortable with the pricing as they describe it (not as I describe it), and continue to monitor what you are charged (e.g., through their 'Budget & Alerts' feature). [Cloud Translation Pricing](https://cloud.google.com/translate/pricing)

![How to use Translate in Place in 3 steps](https://ext.runcode.run/tip/readme/TIP_howto.png)

## Preferences ##

Your Google "Cloud Translate API" key should be entered in the *Extension* preferences.

The language you are translating from and to is set in the *Project* preferences. (It doesn't auto-detect the source language at this time.)

![Project language preferences](https://ext.runcode.run/tip/readme/TIP_project_prefs.png)

## Registering for a Google 'Cloud Translate API' Key ##

Create a Google Cloud account if you don't have one already.

Depending on what you already have set up with Google, the steps to add their Translate API may vary. The process is a little arcane but should only take you 10 minutes. Hopefully the outline below is enough to get most people started but, regrettably, I can't offer tech support if it doesn't work out. (My family keeps me busy enough on that front. :-) )

If you want to test out your API Key, you can substitute it into this URL. If it works in the URL, it should work in this extension. If not, the API key has not been set up properly.

    https://www.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=es&q=Hello+World

To create an API key, start on [the Cloud Translate API page](https://cloud.google.com/translate/).

- From that page, click the big blue "Try Translation free" button. (You may need to sign in again, etc.)

- Confirm your country, organization, agree to terms, identity verification (text message).

- Confirm credit card payment details (might not be charged, but needed to open the account).

- If you see a dialog showing "Get started with an interactive tutorial," click: "Skip for now."

- From the menu on the left (or possibly from the drop down "hamburger" in the top left corner), click "APIs & Services" > "Enabled APIs".

- If this is a new account, you need to "Start a project" to put the Translation API service into. (For me this spun off and never came back. Several Google system errors. Had to start again.)

- Once your project is created, go back to "Enabled APIs & Services". Google seems to enable a pile of APIs to start. I disabled all of them. (Tedious. It's fastest to open every service in a new tab and then go through and disable them tab-by-tab since the disabling takes a few seconds each.)

- Go to the API Library (if you just deleted all the other APIs, it should prompt you to go there) and find the "Cloud Translation API." Enable it and it should take you back to the settings for this API in your account.

- On the Cloud Translate API configuration screen it may show an alert telling you, you need to create credentials.

- (NOTE: In hindsight, this next step may not have been needed.) Click the blue "create credentials" button in the banner. Create credentials for Cloud Translation API, probably with the options "Application Data", "No I'm not using them" (but read the details for yourself). Give the service a name (e.g., "translate"). Click done and it will create a "Service account."

- Click the "Credentials" link in the left nav. At the top of the screen, click the "+ Create Credentials" link / drop-down-menu and select "API Key" from the menu. An API key will be created. **Copy it! This is what you need to put into this extension's preferences to make it work.**

EXTRA STEPS
- As noted in the API Key creation dialog, the key is probably unrestricted. You may want to click "Edit API key" in that dialog to restrict it to only services you use.

- You can set up a "Budget & Alert" monitor to email you when you are approaching your limit (I set mine to $1 since I'm expecting my translation needs to be well within the 'free' tier).

Hopefully that resulted in a functioning API Key for you! I went through creating an account twice just to make sure the steps worked consistently but if the key's not working for you... I'm afraid I don't know enough about Google Cloud to suggest how to fix it.
