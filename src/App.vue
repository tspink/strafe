<template>
  <div class="container mt-4">
    <h2>Sole Trader Financial Forecasting Tool</h2>
    <hr>
    <p>
      <label for="region">Tax Region:</label>
      <select id="region" name="region" v-model="region" class="form-control">
        <option value="scotland">Scotland</option>
      </select>
    </p>
    <p>
      <label for="sl">Student Loan:</label>
      <select id="sl" name="sl" v-model="sl" class="form-control">
        <option value="no">No</option>
        <option value="p1">Plan 1</option>
        <option value="p2">Plan 2</option>
      </select>
    </p>
    <hr>
    <table class="table table-sm table-bordered table-striped">
      <thead>
        <tr>
          <th rowspan="2">Month</th>
          <th colspan="2">Employer</th>
          <th colspan="1">Self-Employed</th>
          <th colspan="5">Target</th>
          <th colspan="3">PAYE</th>
          <th colspan="3">Monthly</th>
        </tr>
        <tr>
          <th width="100px">Gross Pay</th>
          <th width="100px">Taxable Pay</th>
          <!--<th>Cum. Pay</th>-->
          <!--<th>Tgt. Pay</th>-->
          <th width="100px">Taxable Pay</th>
          <!--<th>Cum. Pay</th>-->
          <!--<th>Tgt. Pay</th>-->
          <th>Gross Pay</th>
          <th>Taxable Pay</th>
          <th>Income Tax</th>
          <th>Nat. Ins.</th>
          <th>Student Loan</th>
          <th>Income Tax</th>
          <th>Nat. Ins.</th>
          <th>Student Loan</th>
          <th>Income Tax</th>
          <th>Nat. Ins.</th>
          <th>Student Loan</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th>X</th>
          <th>X</th>
        </tr>
      </tfoot>

      <tbody>
        <tr v-for="mth in months" :key="mth.idx">
          <td class="align-middle">{{mth.name}}</td>
          <td class="align-middle"><input type="number" min="0" v-model.number="mth.taxable.emp_gross" @change="recompute" class="form-control form-control-sm"></td>
          <td class="align-middle"><input type="number" min="0" v-model.number="mth.taxable.emp" @change="recompute" class="form-control form-control-sm"></td>
          <!--<td class="align-middle">{{formatCurrency(mth.cum.emp)}}</td>-->
          <!--<td class="align-middle">{{formatCurrency(mth.tgt.emp)}}</td>-->
          <td class="align-middle"><input type="number" min="0" v-model.number="mth.taxable.se" @change="recompute" class="form-control form-control-sm"></td>
          <!--<td class="align-middle">{{formatCurrency(mth.cum.se)}}</td>-->
          <!--<td class="align-middle">{{formatCurrency(mth.tgt.se)}}</td>-->
          <td class="align-middle">{{formatCurrency(mth.tgt.gross)}}</td>
          <td class="align-middle">{{formatCurrency(mth.tgt.taxable)}}</td>
          <td class="align-middle">{{formatCurrency(mth.tax.income)}}</td>
          <td class="align-middle">{{formatCurrency(mth.tax.ni)}}</td>
          <td class="align-middle">{{formatCurrency(mth.tax.sl)}}</td>
          <td class="align-middle">{{formatCurrency(mth.paye.income)}}</td>
          <td class="align-middle">{{formatCurrency(mth.paye.ni)}}</td>
          <td class="align-middle">{{formatCurrency(mth.paye.sl)}}</td>
          <td class="align-middle">{{formatCurrency(mth.per.income)}}</td>
          <td class="align-middle">{{formatCurrency(mth.per.ni)}}</td>
          <td class="align-middle">{{formatCurrency(mth.per.sl)}}</td>
        </tr>
      </tbody>
    </table>

    <p class="btn-group">
      <button @click="save" class="btn btn-primary">Save</button>
      <button @click="restore" class="btn btn-primary">Restore</button>
    </p>
  </div>
</template>

<script>
import tax from '@/logic/tax'

export default {
  data: () => ({
    region: 'scotland',
    sl: 'p1',
    months: [
      /* eslint key-spacing: 0 */
      { index:  1, name: 'APR', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  2, name: 'MAY', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  3, name: 'JUN', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  4, name: 'JUL', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  5, name: 'AUG', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  6, name: 'SEP', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  7, name: 'OCT', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  8, name: 'NOV', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index:  9, name: 'DEC', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index: 10, name: 'JAN', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index: 11, name: 'FEB', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } },
      { index: 12, name: 'MAR', taxable: { emp_gross: 0, emp: 0, se: 0 }, cum: { emp_gross: 0, emp: 0, se: 0 }, tgt: { emp_gross: 0, emp: 0, se: 0, tot: 0 }, tax: { income: 0, ni: 0, sl: 0 }, paye: { income: 0, ni: 0, sl: 0 }, per: { income: 0, ni: 0, sl: 0 } }
    ]
  }),
  methods: {
    recompute () {
      let incomeRT = 0
      let niRT = 0
      let slRT = 0

      for (let i in this.months) {
        let mth = this.months[i]
        let rem = 13 - mth.index

        mth.cum.emp_gross = mth.taxable.emp_gross
        if (i > 0) {
          mth.cum.emp_gross += this.months[i - 1].cum.emp_gross
        }

        mth.cum.emp = mth.taxable.emp
        if (i > 0) {
          mth.cum.emp += this.months[i - 1].cum.emp
        }

        mth.cum.se = mth.taxable.se
        if (i > 0) {
          mth.cum.se += this.months[i - 1].cum.se
        }

        mth.tgt.emp_gross = mth.taxable.emp_gross * rem
        if (i > 0) {
          mth.tgt.emp_gross += this.months[i - 1].cum.emp_gross
        }

        mth.tgt.emp = mth.taxable.emp * rem
        if (i > 0) {
          mth.tgt.emp += this.months[i - 1].cum.emp
        }

        mth.tgt.se = mth.taxable.se * rem
        if (i > 0) {
          mth.tgt.se += this.months[i - 1].cum.se
        }

        mth.tgt.gross = mth.tgt.emp_gross + mth.tgt.se
        mth.tgt.taxable = mth.tgt.emp + mth.tgt.se

        mth.tax = Object.assign({}, mth.tax, tax.compute(this.region, this.sl, mth.tgt.emp_gross, mth.tgt.emp, mth.tgt.se))
        mth.paye = Object.assign({}, mth.paye, tax.compute(this.region, this.sl, mth.tgt.emp_gross, mth.tgt.emp, 0))

        if (i > 0) {
          mth.per.income = (mth.tax.income - incomeRT) / rem
          mth.per.ni = (mth.tax.ni - niRT) / rem
          mth.per.sl = (mth.tax.sl - slRT) / rem

          incomeRT += mth.per.income
          niRT += mth.per.ni
          slRT += mth.per.sl
        } else {
          mth.per.income = mth.tax.income / rem
          mth.per.ni = mth.tax.ni / rem
          mth.per.sl = mth.tax.sl / rem

          incomeRT = mth.per.income
          niRT = mth.per.ni
          slRT = mth.per.sl
        }
      }
    },
    formatCurrency (val) {
      if (val === undefined) return '£0.00'
      else return `£${val.toFixed(2)}`
    },
    save () {
      let emp = []
      let se = []
      let gr = []

      for (let mth of this.months) {
        emp.push(mth.taxable.emp)
        se.push(mth.taxable.se)
        gr.push(mth.taxable.emp_gross)
      }

      localStorage.setItem('v', JSON.stringify({ emp, se, gr }))
    },
    restore () {
      const l = JSON.parse(localStorage.getItem('v'))

      for (let mth of this.months) {
        mth.taxable.emp = l.emp[mth.index - 1]
        mth.taxable.se = l.se[mth.index - 1]
        mth.taxable.emp_gross = l.gr[mth.index - 1]
      }

      this.recompute()
    }
  }
}
</script>
