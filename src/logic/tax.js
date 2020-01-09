export default {
  rates: {
    'scotland': [
      { from: 0, to: 12500, rate: 0 },
      { from: 12500, to: 14550, rate: 19 },
      { from: 14550, to: 24945, rate: 20 },
      { from: 24945, to: 43430, rate: 21 },
      { from: 43430, to: 150000, rate: 41 },
      { from: 150000, rate: 46 }
    ],
    'ni1': [
      { from: 0, to: 8628, rate: 0 },
      { from: 8628, to: 50004, rate: 12 },
      { from: 50004, rate: 2 }
    ],
    'ni4': [
      { from: 0, to: 8632, rate: 0 },
      { from: 8632, to: 50000, rate: 9 },
      { from: 50000, rate: 2 }
    ],
    'sl': [
      { from: 0, to: 18924, rate: 0 },
      { from: 18924, rate: 9 }
    ]
  },
  compute (region, sl, empGross, empTaxable, seTaxable) {
    switch (region) {
      case 'scotland':
        return {
          income: this.computeScotland(sl, empGross, empTaxable, seTaxable),
          ni: this.computeNI(empGross, empTaxable, seTaxable),
          sl: this.computeSL(sl, empGross, empTaxable, seTaxable)
        }

      default:
        return null
    }
  },
  computeScotland (sl, empGross, empTaxable, seTaxable) {
    const rates = this.rates['scotland']

    const payTotal = empTaxable + seTaxable
    var taxTotal = 0
    for (const rate of rates) {
      const diff = payTotal - rate.from

      if (diff < 0) {
        continue
      }

      const range = rate.to - rate.from
      const rateTaxable = diff < range ? diff : range
      taxTotal = taxTotal + (rateTaxable * rate.rate) / 100
    }

    return taxTotal
  },
  computeNI (empGross, empTaxable, seTaxable) {
    const rates1 = this.rates['ni1']
    const rates4 = this.rates['ni4']

    var ni1Total = 0
    for (const rate of rates1) {
      const diff = empGross - rate.from

      if (diff < 0) {
        continue
      }

      console.log('Diff', diff)

      if (rate.to === undefined) {
        ni1Total = ni1Total + (diff * rate.rate) / 100
      } else {
        const range = rate.to - rate.from
        const rateTaxable = diff < range ? diff : range
        ni1Total = ni1Total + (rateTaxable * rate.rate) / 100
      }
    }

    var ni4Total = 0
    for (const rate of rates4) {
      const diff = seTaxable - rate.from

      if (diff < 0) {
        continue
      }

      if (rate.to === undefined) {
        ni4Total = ni4Total + (diff * rate.rate) / 100
      } else {
        const range = rate.to - rate.from
        const rateTaxable = diff < range ? diff : range
        ni4Total = ni4Total + (rateTaxable * rate.rate) / 100
      }
    }

    const ni2Total = seTaxable > 1000 ? 156 : 0

    return ni1Total + ni4Total + ni2Total
  },
  computeSL (sl, empGross, empTaxable, seTaxable) {
    if (sl === 'none') return 0

    const rates = this.rates['sl']

    var slTotal = 0
    for (const rate of rates) {
      const diff = (empGross + seTaxable) - rate.from

      if (diff < 0) {
        continue
      }

      if (rate.to === undefined) {
        slTotal = slTotal + (diff * rate.rate) / 100
      } else {
        const range = rate.to - rate.from
        const rateTaxable = diff < range ? diff : range
        slTotal = slTotal + (rateTaxable * rate.rate) / 100
      }
    }

    return slTotal
  }
}
