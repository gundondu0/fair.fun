#!/usr/bin/env python
# coding: utf-8

# In[3]:


import random
import matplotlib.pyplot as plt
import numpy as np

class PumpFunClass:
    def __init__(self, initial_sol_in_pool, total_tokens_in_pool):
        self.sol_pool = initial_sol_in_pool
        self.total_coin_supply = total_tokens_in_pool  # Set the total supply of tokens
        self.remaining_tokens_in_pool = total_tokens_in_pool  # Initially, all tokens are in the pool

    def get_token_price(self):
        # Token price = SOL in pool / tokens in pool (DEX-like pricing)
        return self.sol_pool / self.remaining_tokens_in_pool

    def get_mcap_statistics(self):
        # Market capitalization = Total supply * current token price
        return self.total_coin_supply * self.get_token_price() * 150  # Assuming 1 SOL = 150 USD for Mcap calculation

    def get_remaining_token_supply(self):
        # Return the remaining tokens available in the pool
        return self.remaining_tokens_in_pool

    def update_pool_with_buy(self, sol_amount):
        # Update the SOL pool when tokens are bought
        self.sol_pool += sol_amount
        tokens_bought = sol_amount / self.get_token_price()  # How many tokens can be bought at the current price
        self.remaining_tokens_in_pool -= tokens_bought  # Reduce the available token supply in the pool
        return tokens_bought

    def update_pool_with_sell(self, tokens_sold):
        # Update pool when tokens are sold
        self.remaining_tokens_in_pool += tokens_sold  # Return the tokens to the pool
        sol_to_receive = tokens_sold * self.get_token_price()  # Get SOL based on current price
        self.sol_pool -= sol_to_receive  # Deduct SOL from the pool
        return sol_to_receive

# Simulation parameters
sol_price = 150  # USD value of SOL
total_token_supply = 1_000_000_000  # 1 billion tokens total
interaction_duration_seconds = 300  # 5 minutes in seconds
interaction_interval_seconds = 10  # Buyers interact with the pool every 10 seconds
num_simulations = 1000  # Number of Monte Carlo simulations

# Developer-sniper class - sells all after 1 minute (60 seconds)
dev_sell_time = 60  # The dev will sell all tokens after 60 seconds

# Lists to store overall data across all simulations
all_token_prices_over_time = []
all_mcap_over_time = []
all_dev_profits = []

for simulation in range(num_simulations):
    # Initialize the pool with 10 SOL and 1 billion tokens
    initial_sol_in_pool = 10
    pump_fun = PumpFunClass(initial_sol_in_pool=initial_sol_in_pool, total_tokens_in_pool=total_token_supply)

    # Developer-sniper buys tokens (between 3 and 4 SOL)
    dev_buy_amount = random.uniform(3, 4)
    dev_tokens_bought = pump_fun.update_pool_with_buy(dev_buy_amount)
    dev_profit = 0
    dev_tokens_held = dev_tokens_bought  # Dev holds these tokens for later sell
    dev_sold = False  # Track whether the dev has sold

    # Lists to store data for this particular simulation
    token_prices_over_time = []
    mcap_over_time = []

    # Buyers and sellers interact for the first minute
    for second in range(interaction_duration_seconds):
        if second % interaction_interval_seconds == 0:
            print(f"\n[Tick {second} seconds]: Market interactions happening...")

            # Buyers buy for the first 60 seconds to drive the price up
            if second <= dev_sell_time:
                for i in range(4):  # 4 buyers
                    buy_amount = random.uniform(0.15, 1.0)  # Buyers buy between 0.15 and 1 SOL
                    tokens_bought = pump_fun.update_pool_with_buy(buy_amount)
                    print(f"Buyer {i+1} bought {tokens_bought:.6f} tokens for {buy_amount:.2f} SOL.")

                # Introduce sellers to create fluctuations
                for i in range(2):  # 2 sellers
                    if pump_fun.remaining_tokens_in_pool > 0:
                        sell_amount = random.uniform(0.02, 0.1) * pump_fun.remaining_tokens_in_pool  # Small sell amounts
                        sol_received = pump_fun.update_pool_with_sell(sell_amount)
                        print(f"Seller {i+1} sold {sell_amount:.6f} tokens for {sol_received:.2f} SOL.")

            # After 60 seconds, the developer-sniper sells all their tokens
            if second == dev_sell_time and not dev_sold:
                sol_received = pump_fun.update_pool_with_sell(dev_tokens_held)
                dev_profit = sol_received - dev_buy_amount  # Dev profit calculation
                dev_sold = True
                print(f"Developer-sniper sold {dev_tokens_held:.6f} tokens for {sol_received:.2f} SOL.")
                print(f"Developer-sniper made a profit of {dev_profit:.2f} SOL.")

            # After the dev sells, smaller buyers and sellers interact with the pool
            if second > dev_sell_time:
                for i in range(3):  # More buyers and sellers to create price fluctuations
                    small_buy_amount = random.uniform(0.05, 0.2)  # Small buy amounts
                    tokens_bought = pump_fun.update_pool_with_buy(small_buy_amount)
                    print(f"Buyer {i+1} bought {tokens_bought:.6f} tokens for {small_buy_amount:.2f} SOL.")

                    if pump_fun.remaining_tokens_in_pool > 0:
                        small_sell_amount = random.uniform(0.02, 0.1) * pump_fun.remaining_tokens_in_pool  # Small sell amounts
                        sol_received = pump_fun.update_pool_with_sell(small_sell_amount)
                        print(f"Seller {i+1} sold {small_sell_amount:.6f} tokens for {sol_received:.2f} SOL.")

            # Compute and print the token price and remaining tokens in the pool
            token_price = pump_fun.get_token_price()
            token_prices_over_time.append(token_price)

            # Compute and print the market capitalization
            mcap = pump_fun.get_mcap_statistics()
            mcap_over_time.append(mcap)

    # Store data from this simulation
    all_token_prices_over_time.append(token_prices_over_time)
    all_mcap_over_time.append(mcap_over_time)
    all_dev_profits.append(dev_profit)

# Monte Carlo Results - Plots and Analysis
time_ticks = np.arange(0, interaction_duration_seconds, interaction_interval_seconds)

# Plot token price over time (1000 Monte Carlo Simulations)
plt.figure(figsize=(10, 6))
for prices in all_token_prices_over_time:
    plt.plot(time_ticks, prices, color='blue', alpha=0.1)
plt.xlabel("Time (seconds)")
plt.ylabel("Token Price (SOL)")
plt.title("Token Price Over Time (1000 Monte Carlo Simulations)")
plt.show()

# Plot market capitalization over time (1000 Monte Carlo Simulations)
plt.figure(figsize=(10, 6))
for mcap in all_mcap_over_time:
    plt.plot(time_ticks, mcap, color='green', alpha=0.1)
plt.xlabel("Time (seconds)")
plt.ylabel("Market Capitalization (USD)")
plt.title("Market Capitalization Over Time (1000 Monte Carlo Simulations)")
plt.show()

# Plot histogram of dev-sniper profits
plt.figure(figsize=(10, 6))
plt.hist(all_dev_profits, bins=20, color='purple', alpha=0.7)
plt.xlabel("Developer Sniper Profit (SOL)")
plt.ylabel("Frequency")
plt.title("Distribution of Developer Sniper Profits (1000 Simulations)")
plt.show()

# Calculate and print some statistics on developer-sniper profits
mean_dev_profit = np.mean(all_dev_profits)
median_dev_profit = np.median(all_dev_profits)
max_dev_profit = np.max(all_dev_profits)
min_dev_profit = np.min(all_dev_profits)

print(f"Mean Developer Sniper Profit: {mean_dev_profit:.2f} SOL")
print(f"Median Developer Sniper Profit: {median_dev_profit:.2f} SOL")
print(f"Max Developer Sniper Profit: {max_dev_profit:.2f} SOL")
print(f"Min Developer Sniper Profit: {min_dev_profit:.2f} SOL")


# In[ ]:




