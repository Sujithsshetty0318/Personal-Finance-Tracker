package com.demo.personalfinancetracker.controller;

import com.demo.personalfinancetracker.model.Expense;
import com.demo.personalfinancetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping
    public List<Expense> getExpenses(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate, @RequestParam(required = false) Long userId) {
        return expenseService.getExpenses(startDate, endDate, userId);
    }

    @GetMapping("/total")
    public Double getTotalAmount(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam(required = false) Long userId) {
        return expenseService.getTotalAmount(startDate, endDate, userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails, @RequestParam(required = false) Long userId) {
        Expense updatedExpense = expenseService.updateExpense(id, expenseDetails, userId);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteExpense(@PathVariable Long id, @RequestParam(required = false) Long userId) {
        boolean deleted = expenseService.deleteExpense(id, userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
