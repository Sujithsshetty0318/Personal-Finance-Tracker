package com.demo.personalfinancetracker.service;

import com.demo.personalfinancetracker.exception.ResourceNotFoundException;
import com.demo.personalfinancetracker.model.Expense;
import com.demo.personalfinancetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getExpenses(LocalDate startDate, LocalDate endDate, Long userId) {
        if (userId == null) {
            return expenseRepository.findAll();
        }
        if (startDate != null && endDate != null) {
            return expenseRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        }
        return expenseRepository.findByUserId(userId);
    }

    public Double getTotalAmount(LocalDate startDate, LocalDate endDate, Long userId) {
        List<Expense> expenses;
        if (userId == null) {
            expenses = expenseRepository.findByDateBetween(startDate, endDate);
        } else {
            expenses = expenseRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        }
        return expenses.stream().mapToDouble(Expense::getAmount).sum();
    }

    public boolean deleteExpense(Long id, Long userId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found for this id :: " + id));
        
        if (userId != null && !expense.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized: Expense does not belong to this user");
        }
        
        expenseRepository.delete(expense);
        return true;
    }

    public Expense updateExpense(Long id, Expense expenseDetails, Long userId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found for this id :: " + id));
        
        if (userId != null && !expense.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized: Expense does not belong to this user");
        }
        
        expense.setDescription(expenseDetails.getDescription());
        expense.setAmount(expenseDetails.getAmount());
        expense.setDate(expenseDetails.getDate());
        return expenseRepository.save(expense);
    }
}
