import ip from 'ip'

class Config {
  port: number | string
  host: string
  redis_url: string
  jwt: {
    privateKey: string | undefined
    publicKey: string | undefined
    refreshPrivateKey?: string | undefined
    refreshPublicKey?: string | undefined
  }

  mongo_url: string

  constructor() {
    this.port = process.env.PORT ?? 2567
    this.host = process.env.HOST_IP ?? ip.address()
    this.redis_url = process.env.REDIS_URL ?? `redis://${ip.address()}:6379`
    this.mongo_url =
      process.env.MONGO_URL ??
      'bW9uZ29kYjovL21vbmdvZGIxOjI3MDE3LG1vbmdvZGIyOjI3MDE4LG1vbmdvZGIzOjI3MDE5L3VzZXJzP3JlcGxpY2FTZXQ9bXktcmVwbGljYS1zZXQ='

    this.jwt = {
      privateKey:
        process.env.PRIVATE_KEY ??
        'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBMFd5WnRnQ3BrOXVpWkZPT0NkbG5DWXBjalZLdS9qUU9NbnQrNTNRZk9nRGNJQVYzCk9BQm5SU3hzaEc5TmJtRCtONWplaWpwbjduSmRrcHkwdkgzQ0NZOW05cUx3aVRuMnd1NWlPQ3EzRU1ZWmY3YmUKUllqZVBmci9zcDE5YXovVmZpZ1BvWVpCUElBSHBTNkxOVWlTbVkrUFpxajFyOGNLbysvTmF2N2tvSHJjRnpFWApaZHhmVHdWRHNCTS9LNG5HVjY2c3h4enMzdWovenlTcVFmelBvNEt1VWdzRTJDWXFBTFYzbmFCaWtqZ3FvOHVDCmhsNmhkaUdoQVJEemFBdDlzK214MGhFMGFwbGp1VFc5VUdjR1BaY2xsK3JMUTNacVVGUkhwbWN1UkN4UWtveDYKVGlPaStGT2J6UytnN1M5SDZ5bENWWTBCSWN6TVhKV3U3eE14SndJREFRQUJBb0lCQUh3VTZtWHBzby9HZkVzUgpMb0VyYkY4OHVXV0tiZUJ6bTAzUjJmanMxbXVaZ3RMK0tncm1Ra203N25meE1tR0oybFc2bjNBcTl0VlNzWnBpCmVydUxqMkgyc3p6Q2dkM3NtQVliRTlyUGhEUE9DK0dkeWNoTk5kQm5YUVRKUnp3NlVCWTFTajJidkI5S2hEMGMKZktLUFl6elUwRlExRzR5UVUvK1ozNDNiaEQ2SU9tWXhWdE1yYXVnOEFQOG1aQjRZU2hELy80OHM5Zm1Ia01kLwphZ1Y2dXZGa1ZIOXhqSDFuTHlBNDhmODdyZVpoMnB3T2RPcVZ4UmI5YTZKMWN6RWlBWkJiOC93VXZqbHNhY2tJCjh4WHVGUnJEcEVKWk9rQ1M1VS8rcDRVN251bnNHb0x1L2grS3ZwRUlnMEp4UnIvR0lFODBmUmZpODdDVDNFT1EKcmc2QjJYRUNnWUVBNmZqNzh2U3NmVDEwTnZEM1BGclU2dmlYdERTbmZzNm1XMm5uRGZMbitQWDJvZjhHc2N2Ugp0T2p5MytJZVJoeDBkVnpidVVqSU5jM3hCOFFPdFdlaC9EZjRhVkowQTdPV2RhaWtnM2NyelNWMVkzQ20wRnJRCmZUazJGTnZDcC82SFpVUlFwRG5DREJjTUhwdTVUR3lkb3pWSk0rZHN4NUtzS1Z5dFZyMFFRL1VDZ1lFQTVTUDQKc1VacFBZTjhJUkk4YWIxT3dsWW1QOTllQzB5dUhkcmViU05KYTVpZ1RWVElrVDBlZkNOTUVLNzc1bHZYMHFzbgpiRnFRcjlrcjJQM3IydThKNTY4WHk5cWhScDErTWVVL1d2TzJzenBISWhEclVNMDI0SWdiTlYwUDZHQmtLVkwvClBiY3QyUm1Xa3lkOWhZaG9tK2dsbno3OG5QU3pJeVJSK2oxVFN5c0NnWUFLTnNsZzhOZDYzQ3p2blJOZCtpVWoKWU5qV2tCbmp5a2V1NCsrblJ6eGpQUEdZWHRhKytrUGNYdk1EWFE2dlJ0eTZwdVFjc1pXejY1cWpHU2IvT2xmeQo5OHFMWm9NVUNrbitOdTkvb2JzeXlIalliM21JelA0ZkNWbFlEY1B3cTRiam45alpZb0FiSVFKeGI2RG1Pak9qCmhWYjl3aE9ZbnNtUFFMRjhnT0p0NVFLQmdRRFY5TEtnaFFoN2dheUVETTBRUnMybHRGOWV3S2pGa0VIOGFvUEsKRUdyYjV0VzNuM1R2K012Z1NlMGFudWxpL1ZzV3dPMjh4UXZZeHNXa2hlU1d0eURlanFWL21aT0Jwa2xST2FmZwp1elJiUWcxdGg3TFI3ZXhSMTRUZ1hSY2ZlZkhNakV6OFNYQ3NDTEtLa1JNcGZtZC9QRkwwMFJGN1ZSbDN0TkEvCkFzZ2xwUUtCZ1FEREdRREppUHFaS0o2NkxCcmJHc2hoWGxxQUUyc3E5VDVkUUJSUmxxYS9sc3M1ekVteU9NcEIKU213N2UyeFdjekZlVjk4UEQ2Y09OMTEwdjhwZnRVaXVuL0ZrdTdnZk1zdmlxOGpzSWwySTN2NHhSeERQUjNyeApVWDRlRk9tRkJJSU1FdlJaVGVZVSt2OUdEckRGSHFjb29lMUZ6YzlFdGxzZExTbFJ4NVBtR3c9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==',
      publicKey:
        process.env.PUBLIC_KEY ??
        'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUEwV3ladGdDcGs5dWlaRk9PQ2RsbgpDWXBjalZLdS9qUU9NbnQrNTNRZk9nRGNJQVYzT0FCblJTeHNoRzlOYm1EK041amVpanBuN25KZGtweTB2SDNDCkNZOW05cUx3aVRuMnd1NWlPQ3EzRU1ZWmY3YmVSWWplUGZyL3NwMTlhei9WZmlnUG9ZWkJQSUFIcFM2TE5VaVMKbVkrUFpxajFyOGNLbysvTmF2N2tvSHJjRnpFWFpkeGZUd1ZEc0JNL0s0bkdWNjZzeHh6czN1ai96eVNxUWZ6UApvNEt1VWdzRTJDWXFBTFYzbmFCaWtqZ3FvOHVDaGw2aGRpR2hBUkR6YUF0OXMrbXgwaEUwYXBsanVUVzlVR2NHClBaY2xsK3JMUTNacVVGUkhwbWN1UkN4UWtveDZUaU9pK0ZPYnpTK2c3UzlINnlsQ1ZZMEJJY3pNWEpXdTd4TXgKSndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t',

      refreshPrivateKey:
        process.env.REFRESH_PRIVATE_KEY ??
        'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS1FJQkFBS0NBZ0VBbWhXVlVrWTNjakU5VTRKSmw4SUFGT1dzaUFzN3FlbDJucHh5ZVAwc29jdFJIWDg5CkROSkZNZFlpdmVNYmN3Zm5MeGkxMEJsWXZjMFNVcWVsc1FRVlNuR1I1eG9BYm9sOHFSekRXVlFzeU82ZXBoVmIKaHdxbC9WVjF0VmhDRnFHZjc5SjRjWjRHckZYLzhSRjNyNVRXdDlQK29lSng3b0VKQ1V3dlV6MDh1K0craXRVaAppUlUybDVpTTBNb2ZxMHFHd2hGTlp6eWcwdEMya1pSZVR6RXdSdHJCTGNRMitMVnA4NjV1WWlKQmNNNXIvYTJzCjBxWUxnQzN5M1o1eXhRNEZua2RRdDBBL3VtMlVRVmp2cEdwblRkdUtJeEJCZkhsUG1DZ1FEYlJLcHpoNm9Qc2MKVGtZQTF2aVJyT2xtWHJEMjUvajVLcVkrYWp0Zi9VVWNWeDcyeTNHcXJKcXhoUTZmM21Yb0JtTU9KekVtNUk5UApjQnBXMk1RZWVWd0RTU05GZTQrZHlIOCtXcnF4N2t3QldzK1UrRTA4a3ZzQ29sQU9ZQWtSd1g3Z3VBWWFqcjhtClFJWVRtTzNmRHM0ZFhTczBGdkpLb2I4SUR3ZDR4cXBwb093RHdFd2N0VFY1S2VPYlVic1B0VU5zQmtDcjd1S2YKNk9rYU9qdmlhYUpMSnF0TTUwSjZ1QkNoMHl5M1VQbUFQRUZoYkpxMG5IdEMxSHU2VEQ4cTIzM3FsV292WTgvZgpNWUpuM2c2K3c3S0N2NUFXanBnL0ozTXpHREVZSkt6ZGgvczlhNFNOZkI3K0lXeDV1a0UzdEpZTHp5aGMyaGJoCjRQbW4xdE9wZDhKbzg5dlB5TzlqZXZhUFF2eklJeW51REhxMGZBR2xkbDBBWlFDNnJzbHNFZTMvMTFFQ0F3RUEKQVFLQ0FnRUFnMHVJNVlaM2tKSnNrMUFkclhiZDR2Q2lSM3BxNktuTExmUlpoc2NVMVBrT3NYZk9hYkp5eTdpUAorZ1lmU2JHZVNQOWhUV1dMdkkrVjRXQ0JTNGtUSzFBQzUwMjh1SFBuQ2FNOHdrMTdxK3ZJdS9UTy9ROFJ5Z0NjClFGNW9VaWgreERndjhZQ2FaeGNROURYU0tvZEZQM2NoTG9ocVZMVVhJaGtNNm56djE1alFhRFNjVXRjRW9jQ1gKblFIZVluTXF5UXM5VFk3WDYwdDFoaTlLL1dnSW54ZWdMSU5aNUN1UmtOYzlyOWxJc2ZyekFrS1BWUit3QlJVaQpNYjNtUmd0Z3RqSkdrUi9xTGMxWjJ5VVJicVJNU29lYithek1ZR2h1YmxVVStOaDhGR21IOU15RW5oNEFjUzExCjFFVTl1Y3BKV2ZsSk9CSllkT1VMTWlGRnVPYmxtN1J5WW1KU3FTWHIyRTEyMExlY05XU3VZTmZMeDhORVFHbUkKZWpqM29tQnB4U1hVdmhpcTh6ZmRKTXV1dDVsRjFNNlFtWXBTeitFZDZiMmk2ZGViLzBDV3NLUWRFM09WL2xxRAorMkJwNWtGZTM5UXVpbGY0YkFmbVVqTHFXTWVCWGprWTVHTVdLcXltQVR5Nm1OQ29pOTdaTDhvSmcvYnpVZlZOCjBqWWRPU3cyODBNVEZUelFHVGZhSWVLZE5tdVloeE9HRVViVERMNUVmcG1HYWJrdDREVmZaY3puTnNReFdHK20KSUJITDVzVmhPcGdSSFRGTFZlcU5rZEdmb2lVY3hzbWlnaDJ0OTdMVWEvdEltRnUxS1p4eXhHbTN4ZGlJcWhqaQpMOW1QOGMwdTJNQ2UzU0VqTGx5R2lJekhXbVhrOVdYVFFXdlRZZTMyVWJ5K3lDZGR4VkVDZ2dFQkFQTGZsZ3E4CnJ3WkQ4bzV5azA2amtoUlMxNWxoU1Y4cGZucmlac2VMalIwTzVSVVVhYm1Jd0pwTkhMS2ExNHZKR29FamhHaUQKMTc5RkdXYnpXMFJubGhyZjBhaE9UREd6MzhJcUN6Um1MajFzYlpMb24vSFZ3Zms2NTYyaG1kbnJyN09sbWRMWAo2NENQT2NGY3owM2g4ekc3ZnZmbndnU3pmaG9tREt4Qmd5anpvMUJGSjhwN2RwSEJPQ2txMENDUENjV1lyakpyClAvTXp5S2pZQmtPQ0t5ZTFCZmtHeDJEVGtXWW15MzdhTFlYZDlDZFg3UGJ5WURBdXYvVlVtNkVVV1dka0ZPZ1AKK1N4bDVqUHJtcWZVTVFZNjliNGUyTjdSK2ZxcXZzYnVGWk9YVXllRDZHWGZhWUE5YTJDVW9IRVBUUmlmK3UwTwpjUm1mNWtFQUUrQXJERk1DZ2dFQkFLSnBnVXd0eGpTUWhQS29BeTF4R3hQQXJoTjhnSG5PY1dIYlhZMXZxMVpxCjdxVFFCYStKRUFBNnU1ZGVCcTlIdEIyci9Uc0c4MEZYMENTWnNzWGhJQ3lYV2lZOUZYWU5UeEphM0ppbGE4ckEKWUZ3YnA4KzIyNUZXeC9nVnFzRTRDVWxGejVUQVBqN2lTNkxOTDZoN1hheHQyVWlkdUN3b0Rqa0dSKzNYL0dZOAo0ZWlJOVRmemQ4TW9scWZqQ0Y5UmhXcFkxNHIyalpQZXlJcnAxd0k1eSt6R0M5cWk3WHI0ZlNMeGZiWmRBSDZ5ClNWQW5zZUl2UkFoelVqTlI1VVZSQWozVSsxSHI4MU9mdWFYM2Z6aTdKRGtSNnF1eXhOZ1Q5UlR2eXdiaTZnZmsKWUlNMEs2UUg0d1hoWDJnRW5qejBYV0daNTFYUHZ4K1AvbFpjS2VNd2VVc0NnZ0VBUmpvTVlwSm9jWUZZTTRSQgp2KzFnSWV4S1Z4bGdZOW5WcnFha1hYS21uUTVmZ3hiaDh6bnRwekJBNmd3SDQyMkU4bTVZclBmaWZIWDRnR0pCCnM2ZllLWEVxYUdZcmRmdXk2YXZLalo0MkpLQ2psbVVaU280cWhteFg3VWJhKzc1QWtjdUNqUXJPRitCU0xPMHYKTEMvM2FCdjAvSzNRMWhjb2tWc0xNd3ZHWnlMN3lBd1hFMTlieTQxNU5iNGhiQ2l3QktpL1JlanBGdU9VVSs0Uwo4WlpEOERsUnZzNE0vSnh3WUg4N1BEVE9FUFU2MGQyRXNXc29FUWFUanRhbUlZK0d3blNYN3ZvZmJJMFNZVlR3CjVUSmY4cE05MTNtSDcvWDdPRllDei9hcjJuOVpGZ1g0UHV5NHp0SHpxSHVSWU4reHhUc05EVnF0cldFazdRcWUKdEtUOTdRS0NBUUFER0dHbmN3UGhBcFFXRDgrbnNRMGtEanNERWc5Y3d1dDBRdnNBZEExZTQwRFRFVWZhZFpGQgpmOTBOWUhSZUtNNnM5aGNvWmRTQy9VcHhPQ0NwRnNaSE0wYzdqVlI0WUg2T1NmOEVSYnJOTFdkb3Vmb3p3amRqCkNMVmM3QVRLRStoUlppd3ptSXBYSm5ic2psNkhKbnE5aTRabGxPUHFxNFRCMzNYRmVhVk15WUpBclVPSEluTzQKMjNBcm1POFM2Zm5SOGdtQmszdFZReHl0VVJHUThFc0xveWFjcnhnNWpMek55cTVycUZBWEdneTlvMVFIaklFTwpiQ3czNENxdmJJRFBidHl2VGdEZ0toNGVwSjNmRmVuMTBIcVpkUm05U0h3V1B3K3VmT3FhNWVaVStjeVBIcnRiCjVGU3VKZEJpTndJRWx5dEtmbUFWR09odSt1aXRkTUlMQW9JQkFRQys0ZmVTK21FWnJpa3I2VXhkazcwbWpqaWUKdjI0YWNySnM1eEswSWRrREZTUWhkdFhEckMzNjVmR0hVYWs5R3g5aHB2Wk1zQXlSUGNNY3RPeksvU0IrRTRaaQp0eUN6ejlGa2E1ZFZYK0tWYW5BTVQ4dy81MmpFY29NNkxiOGlZOVhzVGVCcHhsR0tQYnA1akRRVm54NkxHUEhlCm84dlJrTG5ZSHpkQ015eXpMZFdDWUhwK0JVbSt4bnF1RHhicFV0RWFSa1NQVTE5bi9VWnU4YWprcFJzb2NLSkIKQ3ZLcmNwRStaZ29wcElkM3pUWWtxSW9JYmZuYUVpM085d2xTSHF4SlF0UjhLZFN1V0trZGdzRHUza3VpNTRvWgpaOXp0WFpyd3k0cDZTNXliUG9UWDNnS2tVM0orMzJDYmgzZjRiMzZPVHRSdDJIVlF0VUUwNndNdWlsMHkKLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0=',
      refreshPublicKey:
        process.env.REFRESH_PUBLIC_KEY ??
        'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUFtaFdWVWtZM2NqRTlVNEpKbDhJQQpGT1dzaUFzN3FlbDJucHh5ZVAwc29jdFJIWDg5RE5KRk1kWWl2ZU1iY3dmbkx4aTEwQmxZdmMwU1VxZWxzUVFWClNuR1I1eG9BYm9sOHFSekRXVlFzeU82ZXBoVmJod3FsL1ZWMXRWaENGcUdmNzlKNGNaNEdyRlgvOFJGM3I1VFcKdDlQK29lSng3b0VKQ1V3dlV6MDh1K0craXRVaGlSVTJsNWlNME1vZnEwcUd3aEZOWnp5ZzB0QzJrWlJlVHpFdwpSdHJCTGNRMitMVnA4NjV1WWlKQmNNNXIvYTJzMHFZTGdDM3kzWjV5eFE0Rm5rZFF0MEEvdW0yVVFWanZwR3BuClRkdUtJeEJCZkhsUG1DZ1FEYlJLcHpoNm9Qc2NUa1lBMXZpUnJPbG1YckQyNS9qNUtxWSthanRmL1VVY1Z4NzIKeTNHcXJKcXhoUTZmM21Yb0JtTU9KekVtNUk5UGNCcFcyTVFlZVZ3RFNTTkZlNCtkeUg4K1dycXg3a3dCV3MrVQorRTA4a3ZzQ29sQU9ZQWtSd1g3Z3VBWWFqcjhtUUlZVG1PM2ZEczRkWFNzMEZ2SktvYjhJRHdkNHhxcHBvT3dECndFd2N0VFY1S2VPYlVic1B0VU5zQmtDcjd1S2Y2T2thT2p2aWFhSkxKcXRNNTBKNnVCQ2gweXkzVVBtQVBFRmgKYkpxMG5IdEMxSHU2VEQ4cTIzM3FsV292WTgvZk1ZSm4zZzYrdzdLQ3Y1QVdqcGcvSjNNekdERVlKS3pkaC9zOQphNFNOZkI3K0lXeDV1a0UzdEpZTHp5aGMyaGJoNFBtbjF0T3BkOEpvODl2UHlPOWpldmFQUXZ6SUl5bnVESHEwCmZBR2xkbDBBWlFDNnJzbHNFZTMvMTFFQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==',
    }
  }
}

export default new Config()
