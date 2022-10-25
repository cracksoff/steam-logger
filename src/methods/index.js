import { community, rl, got, cache } from '#app/utils'

export const getCookie = async (accountName, password, authCode, captcha) => {
	try {
		await community.login(
			{
				accountName: accountName,
				password: password,
				twoFactorCode: authCode,
				captcha: captcha
			},
			async (err, sessionID, cookies, steamguard) => {
				if (err) {
					if (err.message == 'SteamGuardMobile') {
						const code = await rl.question('Steam Authenticator Code: ')

						await getCookie(accountName, password, code)

						return
					}

					if (err.message == 'CAPTCHA') {
						console.log(err.captchaurl)
						const captchaInput = await rl.question('CAPTCHA: ')

						await getCookie(accountName, password, code, captchaInput)

						return
					}

					console.log(err)
					process.exit()
				}

				cache.set('cookie', cookies)
				return
			}
		)
	} catch (err) {
		console.log(`Error in getCookie func: ${err}`)
	}
}

export const getHistory = async () => {
	try {
		const cookie = cache.get('cookie')

		if (!cookie) return { success: false }

		const itemName = 'Glock-18 | Dragon Tattoo (Factory New)'

		const res = await got({
			url: `https://steamcommunity.com/market/pricehistory`,
			resolveBodyOnly: true,
			responseType: 'json',
			headers: {
				cookie: cookie
			},
			searchParams: {
				appid: 730,
				currency: 1,
				market_hash_name: itemName
			}
		})

		if (!res.success) return { success: false }

		return { success: true, body: res }
	} catch (err) {
		console.log(`Error in getHistory func: ${err}`)
	}
}
