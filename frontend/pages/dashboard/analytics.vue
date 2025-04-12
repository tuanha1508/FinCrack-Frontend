<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Analytics</h1>
        <p class="text-muted-foreground">Detailed insights into your financial data</p>
      </div>
      <div class="flex items-center gap-2">
        <UiSelect defaultValue="month">
          <UiSelectTrigger class="w-[150px]">
            <UiSelectValue placeholder="Select period" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="week">Last 7 days</UiSelectItem>
            <UiSelectItem value="month">Last 30 days</UiSelectItem>
            <UiSelectItem value="quarter">Last 90 days</UiSelectItem>
            <UiSelectItem value="year">Last year</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiButton variant="outline" size="sm" class="gap-2">
          <Icon name="lucide:download" class="h-4 w-4" />
          Export
        </UiButton>
      </div>
    </div>

    <!-- Main analytics content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Income vs Expense chart -->
      <UiCard class="shadow-sm">
        <UiCardHeader>
          <UiCardTitle class="text-foreground">Income vs Expenses</UiCardTitle>
          <UiCardDescription>Monthly comparison of your income and expenses</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-80">
            <!-- Chart component would go here -->
            <div class="h-full w-full flex items-center justify-center bg-muted/10 rounded-md">
              <p class="text-muted-foreground">Bar chart visualization</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Spending Categories chart -->
      <UiCard class="shadow-sm">
        <UiCardHeader>
          <UiCardTitle class="text-foreground">Spending by Category</UiCardTitle>
          <UiCardDescription>Where your money is going</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-80">
            <!-- Chart component would go here -->
            <div class="h-full w-full flex items-center justify-center bg-muted/10 rounded-md">
              <p class="text-muted-foreground">Pie chart visualization</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Stats and metrics -->
    <UiCard class="shadow-sm mb-6">
      <UiCardHeader>
        <UiCardTitle class="text-foreground">Key Financial Metrics</UiCardTitle>
        <UiCardDescription>Important ratios and performance indicators</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Savings Rate -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Savings Rate</h3>
            <div class="text-2xl font-bold text-foreground">24%</div>
            <UiProgress value={24} className="h-2" />
            <p class="text-xs text-muted-foreground">Target: 30%</p>
          </div>
          
          <!-- Debt-to-Income -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Debt-to-Income</h3>
            <div class="text-2xl font-bold text-foreground">18%</div>
            <UiProgress value={18} className="h-2" />
            <p class="text-xs text-muted-foreground">Target: &lt;20%</p>
          </div>
          
          <!-- Emergency Fund -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Emergency Fund</h3>
            <div class="text-2xl font-bold text-foreground">3.5 months</div>
            <UiProgress value={58} className="h-2" />
            <p class="text-xs text-muted-foreground">Target: 6 months</p>
          </div>
          
          <!-- Investment Return -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium text-muted-foreground">Investment Return</h3>
            <div class="text-2xl font-bold text-foreground">8.2%</div>
            <UiProgress value={82} className="h-2" />
            <p class="text-xs text-muted-foreground">Benchmark: 7%</p>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Transactions table -->
    <UiCard class="shadow-sm">
      <UiCardHeader>
        <UiCardTitle class="text-foreground">Recent Activity</UiCardTitle>
        <UiCardDescription>Your latest financial transactions</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="rounded-md border">
          <table class="w-full caption-bottom text-sm">
            <thead>
              <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, i) in transactions" :key="i" class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td class="p-4 align-middle">{{ transaction.date }}</td>
                <td class="p-4 align-middle">{{ transaction.description }}</td>
                <td class="p-4 align-middle">
                  <div class="flex items-center gap-2">
                    <div 
                      :class="[
                        'h-2 w-2 rounded-full',
                        transaction.type === 'expense' ? 'bg-rose-500' : 'bg-emerald-500'
                      ]" 
                    />
                    {{ transaction.category }}
                  </div>
                </td>
                <td 
                  :class="[
                    'p-4 align-middle text-right',
                    transaction.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'
                  ]"
                >
                  {{ transaction.type === 'expense' ? '-' : '+' }}${{ transaction.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UiCardContent>
      <UiCardFooter className="border-t pt-4">
        <UiButton variant="outline" size="sm">View All Transactions</UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const transactions = [
  {
    date: 'Apr 15, 2023',
    description: 'Salary Deposit',
    category: 'Income',
    amount: '2,500.00',
    type: 'income'
  },
  {
    date: 'Apr 13, 2023',
    description: 'Amazon Purchase',
    category: 'Shopping',
    amount: '120.50',
    type: 'expense'
  },
  {
    date: 'Apr 10, 2023',
    description: 'Stock Dividend',
    category: 'Investment',
    amount: '75.20',
    type: 'income'
  },
  {
    date: 'Apr 8, 2023',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: '85.30',
    type: 'expense'
  },
  {
    date: 'Apr 5, 2023',
    description: 'Utilities Payment',
    category: 'Housing',
    amount: '145.00',
    type: 'expense'
  }
]
</script> 