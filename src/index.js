import { LOGIN, PASS, sleep } from '#app/utils'
import * as methods from '#app/methods'

const start = async () => {
	try {
		const result = await methods.getHistory()

		if (!result.success) {
			await methods.getCookie(LOGIN, PASS)
			return
		}

		console.log(result.body)

		return
	} catch (err) {
		console.log(`Error in start func: ${err}`)
	} finally {
		await sleep(10000)
		start()
	}
}

start()
